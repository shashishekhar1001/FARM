from django.db import models

# Create your models here.
class Field(models.Model):
    field_name                 = models.CharField(max_length=30)
    field_sector               = models.CharField(max_length=30)
    field_area                 = models.IntegerField()
    field_map                  = models.FileField(upload_to="field_maps/")
    field_7_12                 = models.FileField(upload_to="field_7_12/")
    field_khate_utara          = models.FileField(upload_to="field_khate_utara/")
    field_owner_name           = models.CharField(max_length=50)
    field_owner_aadhar_no      = models.CharField(max_length=50)
    field_owner_aadhar_scan    = models.FileField(upload_to="field_owner_aadhar_scan/")
    field_owner_pan_no         = models.CharField(max_length=50)
    field_owner_pan_scan       = models.FileField(upload_to="field_owner_pan_scan/")
    field_owner_pic            = models.ImageField(upload_to="field_owner_pic/")
    field_owner_bank_scan      = models.FileField(upload_to="field_owner_bank_scan/")
    field_owner_bank_acc_no    = models.CharField(max_length=50)

    def __str__(self):
        return self.field_name 


class Water(models.Model):
    field                      = models.ForeignKey(Field, on_delete=models.CASCADE)
    start                      = models.DateTimeField()
    end                        = models.DateTimeField()
    WATER_IRRIGATION_MODE = [
        ('DIRECT', 'Direct'),
        ('DRIP', 'Drip'),
    ]
    mode                       = models.CharField(max_length=8, choices=WATER_IRRIGATION_MODE)                 

    def __str__(self):
        return self.field


class Expense(models.Model):
    field                      = models.ForeignKey(Field, on_delete=models.CASCADE)
    date                       = models.DateField()
    description                = models.TextField()
    
    def __str__(self):
        return self.field


class FieldProduce(models.Model):
    field                      = models.ForeignKey(Field, on_delete=models.CASCADE)
    date                       = models.DateField()
    CROP_PRODUCED = [
        ('SUGARCANE', 'Sugarcane'),
        ('POYABEAN', 'Soyabean'),
        ('OKRA', 'Okra'),
        ('ZUCHHINI', 'Zucchini'),
        ('CHILLY', 'Chilly'),
    ]
    crop                       = models.CharField(max_length=30, choices=CROP_PRODUCED)
    QUANTITY_UOM = [
        ('KILOS', 'Kilos'),
        ('QUINTALS', 'Quintals'),
        ('TONNES', 'Tonnes'),
    ]
    quantity_uom               = models.CharField(max_length=30, choices=QUANTITY_UOM) 
    quantity                   = models.IntegerField()

    def __str__(self):
        return self.field

                       

class Sale(models.Model):
    date                       = models.DateField()
    description                = models.TextField()
    CROP_SOLD = [
        ('SUGARCANE', 'Sugarcane'),
        ('SOYABEAN', 'Soyabean'),
        ('OKRA', 'Okra'),
        ('ZUCHHINI', 'Zucchini'),
        ('CHILLY', 'Chilly'),
    ]
    crop                       = models.CharField(max_length=30, choices=CROP_SOLD) 
    rate                       = models.IntegerField()
    total_bill                 = models.IntegerField(default=-1, editable=False)
    QUANTITY_UOM = [
        ('KILOS', 'Kilos'),
        ('QUINTALS', 'Quintals'),
        ('TONNES', 'Tonnes'),
    ]
    quantity_uom               = models.CharField(max_length=30, choices=QUANTITY_UOM) 
    quantity                   = models.IntegerField()
    reciept                    = models.FileField(upload_to="sale_receipt/")
    purchased_by               = models.CharField(max_length=40)
    purchaser_contact          = models.CharField(max_length=40)
    sale_order                 = models.CharField(max_length=40, default="SO", unique=True)
    paid_amt                   = models.IntegerField(default=0)
    pending_amt                = models.IntegerField(default=0)
    STATUS                     = [
        ('PENDING', 'PENDING'),
        ('PAID', 'PAID'),
    ]
    status                     = models.CharField(max_length=30, choices=STATUS, default="PENDING") 


    def update_sale_order(self):
        sale_id= Sale.objects.get(sale_order="SO").id
        print(sale_id)
        sale_order = "SO" + str(sale_id)
        Sale.objects.filter(id=sale_id).update(sale_order=sale_order)
        so = Sale.objects.get(sale_order=sale_order)
        print("\n"*3)
        so.total_bill = so.rate * so.quantity
        print(so.total_bill)
        so.save()

    def save(self, *args, **kwargs):
        super(Sale, self).save(*args, **kwargs)
        if self.sale_order == "SO":
            self.update_sale_order() 

    def __str__(self):
        return self.crop
    

class Purchase(models.Model):
    date                       = models.DateField()
    description                = models.TextField()
    CROP_PURCHASED = [
        ('SOYABEAN', 'Soyabean'),
    ]
    crop                       = models.CharField(max_length=30, choices=CROP_PURCHASED) 
    rate                       = models.IntegerField()
    total_bill                 = models.IntegerField(default=-1, editable=False)
    QUANTITY_UOM = [
        ('KILOS', 'Kilos'),
        ('QUINTALS', 'Quintals'),
        ('TONNES', 'Tonnes'),
    ]
    quantity_uom               = models.CharField(max_length=30, choices=QUANTITY_UOM) 
    quantity                   = models.IntegerField()
    sold_by                    = models.CharField(max_length=40)
    seller_contact             = models.CharField(max_length=40)
    purchase_order             = models.CharField(max_length=40, default="PO", unique=True, editable=False)
    paid_amt                   = models.IntegerField(default=0)
    pending_amt                = models.IntegerField(default=0)
    STATUS                     = [
        ('PENDING', 'PENDING'),
        ('PAID', 'PAID'),
    ]
    status                     = models.CharField(max_length=30, choices=STATUS, default="PENDING") 

    def update_purchase_order(self):
        purchase_id= Purchase.objects.get(purchase_order="PO").id
        print(purchase_id)
        purchase_order = "PO" + str(purchase_id)
        Purchase.objects.filter(id=purchase_id).update(purchase_order=purchase_order)
        po = Purchase.objects.get(purchase_order=purchase_order)
        print("\n"*3)
        po.total_bill = po.rate * po.quantity
        print(po.total_bill)
        po.save()

    def save(self, *args, **kwargs):
        super(Purchase, self).save(*args, **kwargs)
        if self.purchase_order == "PO":
            self.update_purchase_order() 

    def __str__(self):
        return self.crop


class Labour(models.Model):
    field                      = models.ForeignKey(Field, on_delete=models.CASCADE)
    date                       = models.DateField()
    description                = models.TextField()
    contractor                 = models.CharField(max_length=40)
    contractor_no              = models.CharField(max_length=40)
    work_description           = models.TextField()
    no_of_workers              = models.IntegerField(default=1)
    daily_wage                 = models.IntegerField(default=250)
    WORK_STATUS                = [
        ('PENDING', 'PENDING'),
        ('DONE', 'DONE'),
    ]
    work_status                = models.CharField(max_length=30, choices=WORK_STATUS, default="PENDING") 
    additional_expenses        = models.IntegerField(default=50)
    PAYMENT_STATUS             = [
        ('PENDING', 'PENDING'),
        ('DONE', 'DONE'),
    ]
    payment_status             = models.CharField(max_length=30, choices=PAYMENT_STATUS, default="PENDING") 
    total_bill                 = models.IntegerField(default=250)
    
    def save(self, *args, **kwargs):
        super(Labour, self).save(*args, **kwargs)
        self.total_bill = self.no_of_workers * self.daily_wage 
        super(Labour, self).save(*args, **kwargs)

    def __str__(self):
        return self.contractor_mukadam
