from django.shortcuts import render,redirect, get_object_or_404
from pathlib import Path
import json
from django.core.paginator import Paginator,EmptyPage
from django.urls import reverse_lazy
from django.views import generic
from .forms import StockForm
from .models import Stock
from .filters import StockFilter
from django.contrib import messages
from csv import DictReader

def load(request):
    BASE_DIR = Path(__file__).resolve().parent.parent
    file=open(f'{BASE_DIR}/janata_stock.csv')
    csv=DictReader(f)
    file.close()
    return redirect('janata:home')
# Create your views here.
def jsonlist(request):
    # Build paths inside the project like this: BASE_DIR / 'subdir'.
    BASE_DIR = Path(__file__).resolve().parent.parent
    file=open(f'{BASE_DIR}/stock_market_data.json')
    stock_list = json.loads(file.read())
    paginator = Paginator(stock_list, 20) # Show 20 items per page.
    page_number = request.GET.get('page')
    try:
        page_obj = paginator.get_page(page_number)
    except EmptyPage:
        #return last page if page limit exceeded
        page_obj = paginator.get_page(paginator.num_pages) 
    return render(request,'json-view.html',{'page_obj': page_obj,'is_paginated':True})

class StockListView(generic.ListView):
    model=Stock
    template_name='list.html'
    paginate_by=25
    
    def get_context_data(self, **kwargs) :
        ctx=super().get_context_data(**kwargs)
        filter=StockFilter()
        ctx['filter']=filter
        if self.request.GET.get('code'):
            ctx['plot_list']=Stock.objects.filter(trade_code=self.request.GET.get('code')).order_by('date')
        else:
            ctx['plot_list']=Stock.objects.order_by('date')
        
        if self.request.GET and len(self.request.GET)>0:
            querystring = self.request.GET.copy()
            if self.request.GET.get('page'):
                del querystring['page']
            ctx['querystring'] = querystring.urlencode()
            querystring={k:querystring[k] for k in querystring.keys() if querystring[k]!="" 
            and querystring[k] is not None}
            if len(querystring)>0:messages.info(self.request,'Search result')

        ctx['code_list']=Stock.objects.values('trade_code').distinct()
        return ctx
    
    def get_queryset(self):
        filter=StockFilter(self.request.GET,queryset=super().get_queryset())
        return filter.qs

def addStock(request):
    if request.method == 'POST':
        form=StockForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request,'Item successfully added')
            return redirect('janata:home')
    else: form=StockForm()
    return render(request, 'create.html', {'form':form})


def updateStock(request,pk):
    a=get_object_or_404(Stock,pk=pk)
    form=StockForm(instance=a)
    if request.method == 'POST':
        form=StockForm(request.POST,instance=a)
        if form.is_valid():
            form.save()
            messages.success(request,'Item successfully updated')
            return redirect('janata:home')
    return render(request, 'edit.html', {'form':form})


class StockDeleteView(generic.DeleteView):
    model =Stock
    success_url = reverse_lazy('janata:home')
    def post(self, request, *args, **kwargs):
        messages.success(request,'Item successfully deleted')
        return super().post(request, *args, **kwargs)

