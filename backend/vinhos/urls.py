from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VinhoViewSet

router = DefaultRouter()
router.register('vinhos', VinhoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
