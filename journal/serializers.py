from rest_framework import serializers
from .models import Spark, MimirResponse

class MimirResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = MimirResponse
        fields = ['id', 'response_content', 'response_type', 'created_at']

class SparkSerializer(serializers.ModelSerializer):
    mimir_responses = MimirResponseSerializer(many=True, read_only=True)
    
    class Meta:
        model = Spark
        fields = ['id', 'content', 'created_at', 'user', 'mimir_responses']
        read_only_fields = ['user']