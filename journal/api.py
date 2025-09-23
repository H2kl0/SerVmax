from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.conf import settings  
import google.generativeai as genai

from .models import Spark, MimirResponse
from .serializers import SparkSerializer, MimirResponseSerializer

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
            idea_principal = spark.content
            prompt = ""
            response_type = "general"

            # Detectar diferentes tipos de ideas y generar prompts más estructurados
            if idea_principal.lower().strip().startswith('aprender:'):
                # MODO APRENDIZAJE
                idea_pura = idea_principal.replace('aprender:', '', 1).strip()
                response_type = "learning"
                prompt = f"""
                Actúa como Mimir, un mentor académico sabio. El usuario quiere aprender sobre: '{idea_pura}'.
                
                Proporciona un plan de aprendizaje estructurado y realizable con:
                
                📚 **TÍTULO DEL PLAN DE APRENDIZAJE**
                [Genera un título atractivo]
                
                🎯 **OBJETIVO PRINCIPAL**
                [Define claramente qué se logrará]
                
                📋 **PLAN DE ACCIÓN (4-6 pasos concretos)**
                1. [Paso inicial específico]
                2. [Segundo paso con recursos]
                3. [Tercer paso práctico]
                4. [Cuarto paso de aplicación]
                5. [Quinto paso de evaluación]
                6. [Sexto paso de profundización]
                
                🛠️ **RECURSOS RECOMENDADOS**
                • [Libros, cursos, herramientas específicas]
                
                ⏱️ **TIEMPO ESTIMADO**
                [Duración realista del plan]
                
                🎉 **RESULTADO ESPERADO**
                [Qué habrás logrado al completar este plan]
                """
                
            elif idea_principal.lower().strip().startswith('proyecto:'):
                # MODO PROYECTO
                idea_pura = idea_principal.replace('proyecto:', '', 1).strip()
                response_type = "project"
                prompt = f"""
                Actúa como Mimir, un consultor de proyectos experto. Ayuda a estructurar este proyecto: '{idea_pura}'.
                
                🚀 **NOMBRE DEL PROYECTO**
                [Genera un nombre atractivo]
                
                🎯 **VISIÓN Y OBJETIVO**
                [Define claramente el propósito]
                
                📊 **ANÁLISIS DE VIABILIDAD**
                • Fortalezas del proyecto
                • Posibles desafíos
                • Oportunidades de mercado
                
                📋 **PLAN DE DESARROLLO (Fases)**
                **Fase 1: Planificación** (Semana 1-2)
                - [Tareas específicas]
                
                **Fase 2: Desarrollo** (Semana 3-6)
                - [Tareas específicas]
                
                **Fase 3: Pruebas y Refinamiento** (Semana 7-8)
                - [Tareas específicas]
                
                **Fase 4: Lanzamiento** (Semana 9-10)
                - [Tareas específicas]
                
                💰 **RECURSOS NECESARIOS**
                • Presupuesto estimado
                • Herramientas requeridas
                • Tiempo de dedicación
                
                📈 **MÉTRICAS DE ÉXITO**
                [Cómo medirás el éxito del proyecto]
                """
                
            elif idea_principal.lower().strip().startswith('negocio:'):
                # MODO NEGOCIO
                idea_pura = idea_principal.replace('negocio:', '', 1).strip()
                response_type = "business"
                prompt = f"""
                Actúa como Mimir, un consultor de negocios experimentado. Analiza esta idea de negocio: '{idea_pura}'.
                
                💼 **CONCEPTO DE NEGOCIO**
                [Descripción clara y concisa]
                
                🎯 **PROPUESTA DE VALOR**
                [Qué problema resuelve y cómo]
                
                👥 **MERCADO OBJETIVO**
                • Perfil del cliente ideal
                • Tamaño del mercado
                • Competencia directa
                
                💰 **MODELO DE NEGOCIO**
                • Fuentes de ingresos
                • Estructura de costos
                • Punto de equilibrio estimado
                
                📋 **PLAN DE ACCIÓN (90 días)**
                **Mes 1: Validación**
                - [Tareas específicas]
                
                **Mes 2: Desarrollo**
                - [Tareas específicas]
                
                **Mes 3: Lanzamiento**
                - [Tareas específicas]
                
                ⚠️ **RIESGOS Y MITIGACIÓN**
                [Principales riesgos y cómo manejarlos]
                
                🚀 **PRÓXIMOS PASOS INMEDIATOS**
                [3 acciones concretas para empezar hoy]
                """
                
            else:
                # MODO GENERAL MEJORADO
                response_type = "creative"
                prompt = f"""
                Actúa como Mimir, un asistente creativo y estratégico. Analiza esta idea: '{idea_principal}'.
                
                💡 **ANÁLISIS DE LA IDEA**
                [Resumen y potencial de la idea]
                
                🌟 **3 DIRECCIONES CREATIVAS**
                
                **Dirección 1: [Nombre descriptivo]**
                • Descripción: [Explicación detallada]
                • Ventajas: [Beneficios específicos]
                • Primeros pasos: [Acciones concretas]
                
                **Dirección 2: [Nombre descriptivo]**
                • Descripción: [Explicación detallada]
                • Ventajas: [Beneficios específicos]
                • Primeros pasos: [Acciones concretas]
                
                **Dirección 3: [Nombre descriptivo]**
                • Descripción: [Explicación detallada]
                • Ventajas: [Beneficios específicos]
                • Primeros pasos: [Acciones concretas]
                
                🎯 **RECOMENDACIÓN DE MIMIR**
                [Cuál dirección recomiendas y por qué]
                
                🚀 **PLAN DE ACCIÓN INMEDIATO**
                1. [Primera acción específica]
                2. [Segunda acción específica]
                3. [Tercera acción específica]
                """

            # Generar respuesta con IA
            genai.configure(api_key=settings.GOOGLE_API_KEY)
            model = genai.GenerativeModel(
                model_name='gemini-2.5-flash',
                generation_config={
                    'temperature': 0.85,  # Creatividad optimizada
                    'top_p': 0.9,         # Diversidad controlada
                    'top_k': 50,          # Variedad de tokens
                    'max_output_tokens': 8192,  # Respuestas detalladas
                    'response_mime_type': 'text/plain'
                }
            )
            
            ai_response = model.generate_content(prompt)
            
            # Guardar la respuesta en la base de datos
            mimir_response = MimirResponse.objects.create(
                spark=spark,
                response_content=ai_response.text,
                response_type=response_type
            )
            
            # Serializar la respuesta para enviarla al frontend
            response_serializer = MimirResponseSerializer(mimir_response)
            
            return Response({
                'ideas': ai_response.text,
                'response_id': mimir_response.id,
                'response_type': response_type,
                'response_data': response_serializer.data
            })

        except Exception as e:
            return Response({'error': str(e)}, status=500)