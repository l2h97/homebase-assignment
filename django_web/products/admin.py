from django.contrib import admin
from products.models import Product

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'description', 'createdAt', 'updatedAt')

admin.site.register(Product, ProductAdmin)