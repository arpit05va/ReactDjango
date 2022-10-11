from django.contrib import admin
from .models import Crops
# Register your models here.
@admin.register(Crops)
class CropsAdmin(admin.ModelAdmin):
    list_display=('name','type')
    search_fields=('name','type')