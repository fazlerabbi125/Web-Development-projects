from django.shortcuts import render,redirect
from django.contrib.auth.forms import AuthenticationForm
from .forms import UserForm,AuthorForm
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
# Create your views here.
def register(request):
    if request.method == 'POST':
        userform = UserForm(request.POST)
        authorform = AuthorForm(request.POST)
        if userform.is_valid() and authorform.is_valid():
            authorform=authorform.save(commit=False)
            u=userform.save()
            authorform.user=u
            authorform.save()
            username = userform.cleaned_data['username']
            password = userform.cleaned_data['password1']
            messages.success(request, 'Profile successfully registered.')
            user = authenticate(username = username,password = password)
            login(request, user)
            return redirect('articles:home')
    else: 
        userform = UserForm()
        authorform = AuthorForm()
    return render(request,'register.html',{'userform':userform,'authorform':authorform})
    
def user_login(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        form.fields['username'].widget.attrs['class'] = 'form-control'
        form.fields['password'].widget.attrs['class'] = 'form-control'  
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None and hasattr(user,'author'):
                login(request, user)
                messages.success(request, 'Login successful')
                return redirect('articles:home')
            else: messages.error(request,'You are not an author of this site')
    else: 
        form = AuthenticationForm()
        form.fields['username'].widget.attrs['class'] = 'form-control'
        form.fields['password'].widget.attrs['class'] = 'form-control'
    return render(request, 'login.html', {'form':form})

def user_logout(request):
    logout(request)
    messages.success(request, 'Logout successful')
    return redirect('articles:home')

