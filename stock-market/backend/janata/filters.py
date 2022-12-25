import django_filters
from django.db import models
from .models import Stock
from .forms import CalendarWidget

class StockFilter(django_filters.FilterSet):
    class Meta: 
        model=Stock
        fields = {
            'trade_code': ['icontains'],
            'date': ['lte', 'gte'],
        }
        filter_overrides = {
             models.DateField: {
                 'filter_class': django_filters.DateFilter,
                 'extra': lambda f: {
                     'widget': CalendarWidget,
                 },
             },
         }