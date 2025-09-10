from django import forms
from .models import Spark

class SparkForm(forms.ModelForm):
    class Meta:
        model = Spark
        fields = ['content']