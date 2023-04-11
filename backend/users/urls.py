from django.urls import path

from . import views

urlpatterns = [
    #path('', views.index),
    path('compress_img_size', views.compress_img_size),
    path('save_personal_info_form', views.push_personal_info_form_to_db),
] 