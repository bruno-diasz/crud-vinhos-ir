from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import viewsets
from .models import Vinho
from .serializers import VinhoSerializer


@method_decorator(csrf_exempt, name='dispatch')
class VinhoViewSet(viewsets.ModelViewSet):
    queryset = Vinho.objects.all()
    serializer_class = VinhoSerializer
