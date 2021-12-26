import django_filters
from django_filters import DateTimeFilter,CharFilter
from django.db import models
from .models import Article
from django import forms
from accounts.forms import CalendarWidget
class ArticleFilter(django_filters.FilterSet):
    title=CharFilter(field_name='title',label='Title',lookup_expr='icontains',widget=forms.TextInput(attrs={'placeholder':'Title'}))
    start_date=DateTimeFilter(field_name='create_date',lookup_expr='gte',label='Created on or after',widget=CalendarWidget)
    end_date=DateTimeFilter(field_name='create_date',lookup_expr='lte',label='Created on or before',widget=CalendarWidget)
    class Meta:
        model=Article
        fields=['title','author','category','create_date']
        filter_overrides = {
             models.DateTimeField: {
                 'filter_class': DateTimeFilter,
                 'extra': lambda f: {
                     'widget': CalendarWidget,
                 },
             },
         }