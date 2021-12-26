from django.shortcuts import render,redirect
from django.urls import reverse_lazy
from django.views import generic
from .models import Article
from .forms import ArticleForm
from accounts.models import Author
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages
from .filters import ArticleFilter
# Create your views here.
class ArticleListView(generic.ListView):
    model=Article
    template_name='article_list.html'
    paginate_by=3
    def get_context_data(self, **kwargs):
        context=super().get_context_data(**kwargs)
        article_filter=ArticleFilter()
        context['article_filter']=article_filter
        if self.request.GET and len(self.request.GET)>0:
            querystring = self.request.GET.copy()
            if self.request.GET.get('page'):
                del querystring['page']
            context['querystring'] = querystring.urlencode()
            messages.info(self.request,'Search result:')
        return context
    def get_queryset(self):
        article_filter=ArticleFilter(self.request.GET,queryset=super().get_queryset())
        return article_filter.qs

class ArticleDetailView(generic.DetailView):
    model=Article
    template_name='article_detail.html'

@login_required(login_url='/accounts/login/')
def createArticle(request):
    if request.method == 'POST':
        form=ArticleForm(request.POST)
        if form.is_valid():
            form=form.save(commit=False)
            form.author=Author.objects.get(user=request.user)
            form.save()
            messages.success(request,'Post successfully added')
            return redirect('articles:home')
    else: form=ArticleForm()
    return render(request, 'article_create.html', {'form':form})

@login_required(login_url='/accounts/login/')
def updateArticle(request,pk):
    a=Article.objects.get(pk=pk)
    if a.author.user==request.user:
        form=ArticleForm(instance=a)
        if request.method == 'POST':
            form=ArticleForm(request.POST,instance=a)
            if form.is_valid():
                form.save()
                messages.success(request,'Post successfully updated')
                return redirect('articles:post',slug=a.slug)
        return render(request, 'article_edit.html', {'form':form})
    else:
        messages.error(request,'Access denied. You need to be the owner of this post')
        return redirect('articles:post',slug=a.slug)


class ArticleDeleteView(LoginRequiredMixin,generic.DeleteView):
    model = Article
    template_name='article_delete.html'
    login_url = '/accounts/login/'
    success_url = reverse_lazy('articles:home')

    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        context = self.get_context_data(object=self.object)
        if self.object.author.user==self.request.user:
             return self.render_to_response(context)
        else:
            messages.error(request,'Access denied. You need to be either the admin or the owner of this post')
            return redirect('articles:post',slug=self.object.slug)

