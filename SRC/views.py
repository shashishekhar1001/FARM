from django.shortcuts import render, HttpResponse

# Create your views here.
def home(request):
    context = {}
    return render(request, "dashboard.html", context)
