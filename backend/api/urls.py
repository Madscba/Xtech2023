from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('patients', views.get_patients),
    path('patient', views.create_patient),
    path('patient/<int:patient_id>/', views.get_patient),
    path('submissions', views.get_submissions),
    path('submission', views.create_submission),
] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
