from django.db import models
from django.contrib.auth.models import User

# Creando modelos para la aplicación "journal"
class Spark(models.Model): # El nombre Spark es un ejemplo, puede ser cualquier otro pero 
#se escogio este por su significado por que es una chispa de idea
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sparks') # Relación con el usuario
    content = models.TextField() # Campo para el contenido de la idea
    created_at = models.DateTimeField(auto_now_add=True) # Campo para la fecha de creación

    def __str__(self):
        return self.content[:50] # Muestra los primeros 50 caracteres del contenido como representación del objeto