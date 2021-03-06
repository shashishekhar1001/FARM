"""SRC URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from . import views as src_views
from farm import views as farm_views
from farm import api_views

router = routers.DefaultRouter()
router.register(r'users', api_views.UserViewSet)
router.register(r'groups', api_views.GroupViewSet)
router.register(r'fields', api_views.FieldViewSet)
router.register(r'waters', api_views.WaterViewSet)
router.register(r'expenses', api_views.ExpenseViewSet)
router.register(r'sales', api_views.SaleViewSet)
router.register(r'purchases', api_views.PurchaseViewSet)
router.register(r'labours', api_views.LabourViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', src_views.home, name='home'),
    path('field/', farm_views.field, name='field'),
    path('water/', farm_views.water, name='water'),
    path('expense/', farm_views.expense, name='expense'),
    path('sale/', farm_views.sale, name='sale'),
    path('purchase/', farm_views.purchase, name='purchase'),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
] 
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
