from django.db import models


class Vinho(models.Model):
    TIPOS = [
        ('Suave', 'Suave'),
        ('Seco', 'Seco'),
        ('Branco', 'Branco'),
        ('Tinto', 'Tinto'),
    ]

    nome = models.CharField(max_length=200)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    tipo = models.CharField(max_length=20, choices=TIPOS)
    disponivel = models.BooleanField(default=False)

    def __str__(self):
        return self.nome
