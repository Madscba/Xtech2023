from django.db import models
from django.contrib.auth.models import User

#NOTE: Some of the field are null/blank for now, but shouldn't be. 

class Practioner(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=200)

class Patient(models.Model):
    GENDER = [
        ("diverse", "diverse"),
        ("female", "female"),
        ("male", "male"),
    ]
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=200)
    gender = models.CharField(max_length=7, choices=GENDER, null=True, blank=True)
    ethnicity = models.CharField(max_length=100, null=True, blank=True)
    diseases = models.TextField(null=True, blank=True)
    birth_year = models.IntegerField(null=True, blank=True)
    admin = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

class Submission(models.Model):
    STATUS_OPTIONS = [
        ("open", "open"),
        ("completed", "completed"),
    ]
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True, blank=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, choices=STATUS_OPTIONS, null=True, blank=True)
    detection_result = models.IntegerField(null=True, blank=True)
    detection_at = models.DateTimeField(null=True, blank=True)
    practioner = models.ForeignKey(Practioner, on_delete=models.CASCADE, null=True, blank=True)

class SubmittedEyes(models.Model):
    eye_side = models.CharField(max_length=20, null=True, blank=True)
    eye_image = models.CharField(max_length=200, blank=True, null=True)
