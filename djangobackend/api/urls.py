from django.db import router
from django.urls import path
from api import views
from api.views import CropViewSet
from rest_framework.routers import DefaultRouter

router =DefaultRouter()
router.register(r'crop',views.CropViewSet,basename='crop')
urlpatterns=router.urls