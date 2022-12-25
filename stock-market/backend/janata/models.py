from django.db import models
from django.utils import timezone
# Create your models here.

class Stock(models.Model):
    trade_code=models.CharField(max_length=255)
    date = models.DateField(default=timezone.now)
    high=models.FloatField()
    low=models.FloatField()
    open=models.FloatField()
    close=models.FloatField()
    volume=models.IntegerField()
    class Meta:
        ordering=['trade_code']
