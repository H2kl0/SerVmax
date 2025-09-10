from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SignUpView
from .api import SparkViewSet

router = DefaultRouter()
router.register(r'sparks', SparkViewSet, basename='spark')

urlpatterns = [
    path("signup/", SignUpView.as_view(), name="signup"),
    path("api/", include(router.urls)),
]