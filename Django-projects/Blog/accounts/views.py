from django.shortcuts import render,redirect,get_object_or_404
from django.contrib.auth.forms import AuthenticationForm
from .forms import UserForm,AuthorForm
from django.contrib.auth import authenticate, login, logout, models
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.urls import reverse_lazy
from .models import Author
#Custom authentication decorator
def guest(view_func):
    def wrapper_func(request,*arg, **kwargs):
        if request.user.is_authenticated and hasattr(request.user,'author'):
            messages.info(request,'You are currently logged in.')
            return redirect('accounts:profile',username=request.user.username)
        else: return view_func(request,*arg, **kwargs)
    return wrapper_func
# Create your views here.
@guest
def register(request):
    if request.method == 'POST':
        userform = UserForm(request.POST)
        authorform = AuthorForm(request.POST, request.FILES)
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
            return redirect('accounts:profile',username=user.username)
    else: 
        userform = UserForm()
        authorform = AuthorForm()
    return render(request,'register.html',{'userform':userform,'authorform':authorform})

@guest
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
                return redirect('accounts:profile',username=user.username)
            else: messages.error(request,'You are not an author of this site')
    else: 
        form = AuthenticationForm()
        form.fields['username'].widget.attrs['class'] = 'form-control'
        form.fields['password'].widget.attrs['class'] = 'form-control'
    return render(request, 'login.html', {'form':form})

@login_required(login_url='accounts:login')
def user_logout(request):
    logout(request)
    messages.success(request, 'Logout successful')
    return redirect('articles:home')

@login_required(login_url='/accounts/login/')
def profileView(request,username):
    if hasattr(request.user,'author'):
        context=dict() 
        context['author']=get_object_or_404(Author,user__username=username)
        context['profile_posts']=context['author'].article_set.all()
        return render(request,template_name='profile.html', context=context)
    return redirect('articles:home')

@login_required(login_url='accounts:login')
def account_update(request,username):
    user=get_object_or_404(models.User,username=username)
    userform = UserForm(instance=user)
    authorform = AuthorForm(instance=user.author)
    if request.method == 'POST':
        userform = UserForm(request.POST,instance=user)
        authorform = AuthorForm(request.POST, request.FILES,instance=user.author)
        if userform.is_valid() and authorform.is_valid():
            authorform=authorform.save(commit=False)
            u=userform.save()
            authorform.user=u
            authorform.save()
            username = userform.cleaned_data['username']
            password = userform.cleaned_data['password1']
            user = authenticate(username = username,password = password)
            login(request, user)
            messages.success(request, 'Your profile has been updated.')
            return redirect('accounts:profile',username=user.username)
    return render(request,'info_update.html',{'userform':userform,'authorform':authorform})

@login_required(login_url='/accounts/login/')
def account_delete(request,username):
    user=get_object_or_404(models.User,username=username)
    if request.method == 'POST':
        logout(request)
        user.delete()
        messages.success(request, 'Your profile has been deleted.')
        return redirect('articles:home')
    else: return render(request,'account_delete.html',{'user':user})