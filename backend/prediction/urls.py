from django.urls import path

from . import views

urlpatterns = [
    path('', views.index),
    path('ml/predict-local', views.machine_learning_test),
    path('ml/predict-transfer', views.predict_dummy),
    path('ml/predict', views.predict),
] 