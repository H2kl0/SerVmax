from rest_framework import serializers
from .models import Spark

class SparkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spark
        fields = ['id', 'content', 'created_at', 'user']
        read_only_fields = ['user'] 