from rest_framework import serializers
from .models import Vinho


class VinhoSerializer(serializers.ModelSerializer):
    preco = serializers.DecimalField(
        max_digits=10, decimal_places=2, coerce_to_string=False
    )

    class Meta:
        model = Vinho
        fields = ['id', 'nome', 'preco', 'tipo', 'disponivel']
