from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Author
from django import forms 

class UserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['first_name','last_name','username', 'email', 'password1', 'password2']
        widgets = {
        'first_name': forms.TextInput(attrs={'class': "form-control",'placeholder':'First name'}),
		'last_name': forms.TextInput(attrs={'class': "form-control",'placeholder':'Last name'}),
        'username': forms.TextInput(attrs={'class': "form-control"}),
        'email': forms.EmailInput(attrs={'class': "form-control"}),
        }
    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
        self.fields['password1'].widget.attrs['class'] = 'form-control'
        self.fields['password2'].widget.attrs['class'] = 'form-control'

class CalendarWidget(forms.DateInput):
    input_type='date'

class AuthorForm(forms.ModelForm):
    class Meta:
        model=Author
        exclude=['user']
        widgets = {
        'bio': forms.Textarea(attrs={'cols': 100, 'rows': 10,'class': "form-control"}),
        'birth_date': CalendarWidget(attrs={'class': "form-control"})}

