from dataclasses import fields
from pyexpat import model

from matplotlib import widgets
from .models import Stock
from django import forms

class CalendarWidget(forms.DateInput):
    input_type='date'

class StockForm(forms.ModelForm):

    class Meta:
        model=Stock
        fields= '__all__'
        widgets={
        'date': CalendarWidget(attrs={'class': "form-control"}),
        'trade_code': forms.TextInput(attrs={'class': "form-control"}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['high'].widget.attrs.update({'class': 'form-control'})
        self.fields['low'].widget.attrs['class'] = 'form-control'
        self.fields['open'].widget.attrs.update({'class': 'form-control'})
        self.fields['close'].widget.attrs['class'] = 'form-control'
        self.fields['volume'].widget.attrs['class'] = 'form-control'

     
