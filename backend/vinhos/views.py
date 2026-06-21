from rest_framework import viewsets
from .models import Vinho
from .serializers import VinhoSerializer


class VinhoViewSet(viewsets.ModelViewSet):
    queryset = Vinho.objects.all()
    serializer_class = VinhoSerializer
