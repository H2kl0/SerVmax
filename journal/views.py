from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from .models import Spark
from .forms import SparkForm
from django.conf import settings
import google.generativeai as genai
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic


@login_required
# se crea la vista para listar los sparks
def spark_list(request,):
    if request.method == 'POST':
        form = SparkForm(request.POST)
        if form.is_valid():
            new_spark = form.save(commit=False)
            new_spark.user = request.user
            new_spark.save()
            return redirect('spark_list') # Redirect to the same page

    sparks = Spark.objects.filter(user=request.user) # Filtra por el usuario autenticado
    form = SparkForm() # An empty form for the user

    context = {
        'sparks': sparks,
        'form': form,
    }
    return render(request, 'journal/spark_list.html', context)

@login_required
def spark_delete(request, pk):
    spark = get_object_or_404(Spark, pk=pk, user=request.user)
    if request.method == 'POST':
        spark.delete()
        return redirect('spark_list')
    
    return redirect('spark_list')

@login_required
def spark_edit(request, pk): 
    spark = get_object_or_404(Spark, pk=pk,)

    if spark.user != request.user:
        return redirect('spark_list')
    
    if request.method == 'POST':
        form = SparkForm(request.POST, instance=spark)
        if form.is_valid():
            form.save()
            return redirect('spark_list')
    else:
        form = SparkForm(instance=spark)    
    return render(request, 'journal/spark_edit.html', {'form': form})

def test_ai(request):
    # configura la api con la clave desde settings.py
    genai.configure(api_key=settings.GOOGLE_API_KEY)

    # crear el modelo
    model = genai.GenerativeModel("gemini-1.5-flash")

    # Pregunta simple
    response = model.generate_content("¿cuando murio hitler?")

    # Devuelve la respuesta de la IA como una página web simple
    return HttpResponse(response.text)

# se crea la vista para ver el detalle de la idea 
def spark_detail(request, pk):
    spark = Spark.objects.get(pk=pk)
    ai_response = None  # Initialize the variable

    if request.method == 'POST':
        # This block only runs when the button is clicked
        genai.configure(api_key=settings.GOOGLE_API_KEY)
        model = genai.GenerativeModel('gemini-1.5-flash')

        prompt = f"Basado en esta idea: '{spark.content}', dame 3 ideas relacionadas para expandirla."
        response = model.generate_content(prompt)
        ai_response = response.text

        print(f"Respuesta de la SerVX: {ai_response}")

    # These lines are now correctly outside the 'if' block
    # They will run for BOTH GET and POST requests
    context = {
        'spark': spark,
        'ai_response': ai_response,
    }
    return render(request, 'journal/spark_detail.html', context)

class SignUpView(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'