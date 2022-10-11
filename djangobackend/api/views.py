from django.shortcuts import render

from django.shortcuts import render
from .models import Crops
from .serializers import CropsSerializer
# from rest_framework.generics import ListAPIView
from rest_framework import viewsets
# Create your views here.

# class CropList(ListAPIView):
#     queryset=Crops.objects.all()
#     serializer_class=CropsSerializer


class CropViewSet(viewsets.ModelViewSet):
    serializer_class = CropsSerializer
    queryset = Crops.objects.all()
