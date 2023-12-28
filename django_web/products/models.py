from django.db import models

# Create your models here.
class Product(models.Model):
  name = models.CharField(db_column='name', max_length=100, blank=False)
  title = models.CharField(db_column='title', max_length=100, blank=False)
  description = models.TextField(db_column='description', max_length=1000, blank=False)
  createdAt = models.DateTimeField(db_column='createdAt', auto_now_add=True)
  updatedAt = models.DateTimeField(db_column='updatedAt', auto_now_add=True)
  class Meta:
    db_table = 'product'
