from django.shortcuts import render

# Create your views here.
def field(request):
    context = {}
    return render(request, "field.html", context)

def water(request):
    context = {}
    return render(request, "water.html", context)

def expense(request):
    context = {}
    return render(request, "expense.html", context)

def sale(request):
    context = {}
    return render(request, "sale.html", context)

def purchase(request):
    context = {}
    return render(request, "purchase.html", context)