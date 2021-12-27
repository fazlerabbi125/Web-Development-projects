from django.shortcuts import render,redirect
from django.contrib.auth.forms import AuthenticationForm
from .forms import UserForm,AuthorForm
from django.contrib.auth import authenticate, login, logout, models
from django.contrib import messages
from django.views.generic import DetailView
from django.urls import reverse_lazy
from .models import Author
# Create your views here.
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
            return redirect('accounts:profile',pk=user.author.id)
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
                return redirect('accounts:profile',pk=user.author.id)
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

class ProfileView(DetailView):
    model=Author
    template_name='profile.html'
    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        context = self.get_context_data(object=self.object)
        context['profile_posts']=self.object.article_set.all()
        return self.render_to_response(context)

def account_update(request,username):
    user=models.User.objects.get(username=username)
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
            messages.success(request, f'Your profile has been updated {username}.')
            return redirect('accounts:profile',pk=user.author.id)
    return render(request,'info_update.html',{'userform':userform,'authorform':authorform})

def account_delete(request,username):
    user=models.User.objects.get(username=username)
    if request.method == 'POST':
        logout(request)
        user.delete()
        messages.success(request, 'Your profile has been deleted.')
        return redirect('articles:home')
    else: return render(request,'account_delete.html',{'user':user})