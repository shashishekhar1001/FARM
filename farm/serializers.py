from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.pagination import PageNumberPagination
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
            'url',
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

class WaterSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Water
        fields = [
            'url',
            'id',
            'field',
            'start',
            'end',
            'mode',
            'source'
        ]

        
class ExpenseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Expense
        fields = [
            'url',
            'id',
            'field',
            'date',
            'description',
            'amount',
        ]


class SaleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Sale
        fields = [
            'url',
            'id',
            'date',
            'description',
            'crop',
            'rate',
            'total_bill',
            'quantity_uom',
            'quantity',
            'reciept',
            'purchased_by',
            'purchaser_contact',
            'sale_order',
            'paid_amt',
            'pending_amt',
            'status',
        ]

    def create(self, validated_data):
        so = Sale.objects.create(**validated_data)
        so.total_bill = so.rate * so.quantity 
        so.sale_order = "SO" + str(so.id)
        # so.save()
        return so  

    def update(self, instance, validated_data):
        print("API:-")
        instance.date = validated_data.get('date', instance.date)
        instance.description = validated_data.get('description', instance.description)
        instance.crop = validated_data.get('crop', instance.crop)
        instance.rate = validated_data.get('rate', instance.rate)
        instance.total_bill = validated_data.get('total_bill', instance.total_bill)
        instance.quantity_uom = validated_data.get('quantity_uom', instance.quantity_uom)
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.reciept = validated_data.get('reciept', instance.reciept)
        instance.purchased_by = validated_data.get('purchased_by', instance.purchased_by)
        instance.purchaser_contact = validated_data.get('purchaser_contact', instance.purchaser_contact)
        instance.sale_order = "SO" + str(instance.id)
        instance.paid_amt = validated_data.get('paid_amt', instance.paid_amt)
        instance.pending_amt = validated_data.get('pending_amt', instance.pending_amt)
        instance.status = validated_data.get('status', instance.status)
        print(instance.sale_order)
        instance.save()
        return instance
    