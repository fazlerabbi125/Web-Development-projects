from django import forms
from .models import Article
class ArticleForm(forms.ModelForm):
    class Meta:
        model=Article
        exclude=['create_date','update_date','slug','author']#,'author'
        widgets={
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'body': forms.Textarea(attrs={'rows': 8,'class': 'form-control'}),
        }
