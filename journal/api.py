from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.conf import settings  
import google.generativeai as genai

from .models import Spark
from .serializers import SparkSerializer

class SparkViewSet(viewsets.ModelViewSet):
    serializer_class = SparkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.sparks.all().order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def generate_ideas(self, request, pk=None):
        spark = self.get_object()

        if spark.user != request.user:
            return Response({'error': 'No tienes permiso para esta acción.'}, status=403)

        try:
            # --- LÓGICA CONDICIONAL ---
            idea_principal = spark.content
            prompt = "" # Inicializamos el prompt

            # Verificamos si la idea comienza con nuestra palabra clave
            if idea_principal.lower().strip().startswith('aprender:'):
                # MODO APRENDIZAJE
                
                # Quitamos la palabra clave para obtener la idea pura
                idea_pura = idea_principal.replace('aprender:', '', 1).strip()
                
                # Creamos un prompt para estructurar la idea
                prompt = f"""
                Actúa como un mentor académico. El usuario quiere desarrollar la siguiente idea: '{idea_pura}'.
                Ayúdalo a formar una idea completa y estructurada. 
                Devuelve un plan simple con los siguientes puntos:
                1. Título sugerido.
                2. Introducción (un párrafo breve).
                3. Puntos Clave a desarrollar (3 a 4 puntos en una lista).
                4. Conclusión (un párrafo breve).
                """
            else:
                # MODO NORMAL (como antes)
                prompt = f"Basado en esta idea: '{idea_principal}', dame 3 ideas relacionadas y creativas para expandirla en una lista simple."

            # --- FIN DE LA LÓGICA CONDICIONAL ---

            genai.configure(api_key=settings.GOOGLE_API_KEY)
            model = genai.GenerativeModel(model_name='gemini-1.5-flash')
            
            response = model.generate_content(prompt)

            return Response({'ideas': response.text})

        except Exception as e:
            return Response({'error': str(e)}, status=500)