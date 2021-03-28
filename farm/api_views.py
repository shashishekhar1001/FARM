from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from .models import *
from rest_framework.pagination import PageNumberPagination
from .serializers import *

class LargeResultsSetPagination(PageNumberPagination):
    page_size = 1000
    page_size_query_param = 'page_size'
    max_page_size = 10000

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000


class SmallResultsSetPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 100


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class FieldViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Fields to be viewed or edited.
    """
    queryset = Field.objects.all()
    serializer_class = FieldSerializer
    permission_classes = [permissions.IsAuthenticated]


class WaterViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Water to be viewed or edited.
    """
    queryset = Water.objects.all().order_by('-id')
    serializer_class = WaterSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = SmallResultsSetPagination


class ExpenseViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Expense to be viewed or edited.
    """
    queryset = Expense.objects.all().order_by('-id')
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = SmallResultsSetPagination


class SaleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Sale to be viewed or edited.
    """
    queryset = Sale.objects.all().order_by('-id')
    serializer_class = SaleSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = SmallResultsSetPagination


class PurchaseViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Purchase to be viewed or edited.
    """
    queryset = Purchase.objects.all().order_by('-id')
    serializer_class = PurchaseSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = SmallResultsSetPagination


class LabourViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Labour to be viewed or edited.
    """
    queryset = Labour.objects.all().order_by('-id')
    serializer_class = LabourSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = SmallResultsSetPagination

