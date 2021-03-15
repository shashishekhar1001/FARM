from django.shortcuts import render

# Create your views here.
def field(request):
    context = {}
    return render(request, "field.html", context)
