from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from .models import *
from .serializers import UserSerializer, GroupSerializer, FieldSerializer, WaterSerializer

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
    queryset = Water.objects.all()
    serializer_class = WaterSerializer
    permission_classes = [permissions.IsAuthenticated]
