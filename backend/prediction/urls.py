from django.urls import path

from . import views

urlpatterns = [
    path('', views.index),
    path('ML/predict_local', views.machine_learning_test),
    path('ML/predict_transfer', views.predict_dummy),
    path('ML/predict', views.predict),
] 