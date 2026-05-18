from django.shortcuts import render
from django.http import HttpResponse

# VIES

def home(response):
    print("Home")
    return HttpResponse("Bem vindo à home")
    