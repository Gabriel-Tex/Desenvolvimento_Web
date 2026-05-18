from django.shortcuts import render
from django.http import HttpResponse

# VIEWS

def blog(request):
    print("blog")
    return render(request, 'blog/index.html')       

def exemple(request):
    print("exemplo")
    return HttpResponse("Exemplo")