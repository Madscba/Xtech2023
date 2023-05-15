from django.db import models
from django.contrib import admin
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
    consent = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Submission(models.Model):
    STATUS_OPTIONS = [
        ("open", "open"),
        ("completed", "completed"),
    ]
    created_at = models.DateTimeField(auto_now_add=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, choices=STATUS_OPTIONS, null=True, blank=True)
    detection_at = models.DateTimeField(auto_now=True)
    practioner = models.ForeignKey(Practioner, on_delete=models.CASCADE, null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"submission for:{self.patient.first_name}, status: {self.status}"

def get_file_path(instance, filename):
        return f"submission-{instance.submission.id}/images/{filename}"

class SubmittedEye(models.Model):
    EYE_SIDES = [
        ("left", "left"),
        ("right", "right"),
    ]
    eye_side = models.CharField(max_length=20, choices=EYE_SIDES, null=True, blank=True)
    image = models.ImageField(upload_to=get_file_path, null=True, blank=True)
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE, null=True, blank=True)
    risk_level = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"submission: {self.submission.id}, eye-side: {self.eye_side}"

