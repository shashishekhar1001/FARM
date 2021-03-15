from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import *


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class FieldSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Field
        fields = [
            'id',
            'field_name',             
            'field_sector',           
            'field_area',             
            'field_map',              
            'field_7_12',             
            'field_khate_utara',      
            'field_owner_name',       
            'field_owner_aadhar_no',  
            'field_owner_aadhar_scan',
            'field_owner_pan_no',     
            'field_owner_pan_scan',   
            'field_owner_pic',        
            'field_owner_bank_scan',  
            'field_owner_bank_acc_no'
        ]