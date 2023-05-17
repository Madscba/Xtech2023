from django.urls import path
from . import views

urlpatterns = [
    path('patients', views.get_patients),
    path('patient', views.create_patient),
    path('patient/<int:patient_id>/', views.get_patient),
    path('submissions', views.get_submissions),
    path('submission', views.create_submission),
    path('submission/<int:submission_id>/', views.get_submission),
    path('submission/history/<int:patient_id>/', views.get_submission_history),
]
