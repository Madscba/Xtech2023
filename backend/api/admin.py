from django.contrib import admin
from .models import Practioner, Patient, Submission, SubmittedEye

# Register your models here.
admin.site.register(Practioner)
admin.site.register(Patient)
admin.site.register(Submission)
admin.site.register(SubmittedEye)