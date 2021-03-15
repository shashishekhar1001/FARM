from django.contrib import admin
from .models import *
# Register your models here.

# class FieldFormAdmin(admin.ModelAdmin):
#     list_display = ["name", "email", "subject", "message", "time_stamp"]
#     class Meta:
#         model = ContactForm

admin.site.register(Field)
admin.site.register(Water)
admin.site.register(Expense)
admin.site.register(FieldProduce)
admin.site.register(Sale)
admin.site.register(Purchase)
admin.site.register(Labour)