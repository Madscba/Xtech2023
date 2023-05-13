from django.urls import path

from . import views

urlpatterns = [
    path('patient/add', views.add_patient),
    path('predict-local', views.machine_learning_test),
    path('predict-transfer', views.predict_dummy),
    path('predict', views.predict),
    path('img_quality_local_test', views.img_quality_local_test),
    path('evaluate_img_quality', views.evaluate_img_quality),
] 