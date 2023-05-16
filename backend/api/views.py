from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt 
import json
import requests, sys, os, piq
from datetime import datetime
from PIL import Image
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from .serializers import PatientSerializer, SubmissionSerializer, SubmittedEyeSerializer
from .models import Patient, Submission, SubmittedEye
from .utils import encode_request_data
from prediction.views import dummy_glaucoma_prediction

#TODO: remove @csrf_exempt
#TODO: add permission classes/middleware

@csrf_exempt
def create_patient(request):
    try:
        if request.method == 'POST':
            admin = User.objects.get(email=os.environ.get('USER_EMAIL'))
            #NOTE: the additional user data is not stored for now due to gdpr concerns
            #NOTE: no backend validation yet
            patient_data = encode_request_data(request)
            patient = Patient(admin=admin, first_name=patient_data['firstname'], last_name=patient_data['lastname'], email=patient_data['email'], birth_year=patient_data['birthyear'], consent=patient_data['consent'])
            patient.save()
    except:
        return JsonResponse({ "message": "adding a user failed" }, status=400)
    return JsonResponse({ "message": "added user successfully" }, status=200)

def get_patients(request):
    try:
        #TODO: add pagination
        patients = Patient.objects.all()[:10]
        serialized_patients = PatientSerializer(patients, many=True)
    except:
        return JsonResponse({ "message": "fetching patients failed" }, status=400)
    return JsonResponse({ "data": serialized_patients.data }, status=200)

def get_patient(request, patient_id):
    try:
        if patient_id: 
            patient = Patient.objects.get(id=patient_id)
            serialized_patient = PatientSerializer(patient, many=False)
    except:
        return JsonResponse({ "message": "fetching patient data failed" }, status=400)
    return JsonResponse({ "data": serialized_patient.data }, status=200)

@csrf_exempt
def create_submission(request):
    try:
        if request.method == 'POST':
            patient_id = request.POST['patient']
            patient = Patient.objects.get(id=patient_id)
            author = User.objects.get(email=os.environ.get('USER_EMAIL'))
            submission = Submission(patient=patient, author=author)
            submission.save()
            if "right_eye" in request.FILES: 
                risk_level = dummy_glaucoma_prediction(request.FILES["right_eye"])
                submitted_eye = SubmittedEye(eye_side="right", image=request.FILES["right_eye"], submission=submission, risk_level=risk_level)
                submitted_eye.save()
            if "left_eye" in request.FILES: 
                risk_level = dummy_glaucoma_prediction(request.FILES["left_eye"])
                submitted_eye = SubmittedEye(eye_side="left", image=request.FILES["left_eye"], submission=submission, risk_level=risk_level)
                submitted_eye.save()
            submission = Submission.objects.get(id=submission.id)
            submission.status = "completed"
            submission.save()
    except Exception as e:
        print(e)
        return JsonResponse({ "message": "submission creation failed" }, status=400)
    return JsonResponse({ "message": "submission was created successfully", "submission": submission.id }, status=200)

def get_submissions(request):
    try:
        #TODO: add pagination
        admin = User.objects.get(email=os.environ.get('USER_EMAIL'))
        enriched_submissions = []
        submissions = Submission.objects.all().filter(author=admin)[:10]
        for submission in submissions:
            submitted_eyes = SubmittedEye.objects.all().filter(submission=submission)
            enriched_submissions.append({"submission": SubmissionSerializer(submission, many=False).data, "submitted_eyes": SubmittedEyeSerializer(submitted_eyes, many=True).data})
    except Exception as e:
        return JsonResponse({ "message": "fetching submissions failed" }, status=400)
    return JsonResponse({ "data": enriched_submissions }, status=200)

def get_submission(request, submission_id):
    try:
        if submission_id: 
            admin = User.objects.get(email=os.environ.get('USER_EMAIL'))
            submission = Submission.objects.get(id=submission_id)
            submitted_eyes = SubmittedEye.objects.all().filter(submission=submission)
            enriched_submission = {"submission": SubmissionSerializer(submission, many=False).data, "submitted_eyes": SubmittedEyeSerializer(submitted_eyes, many=True).data}
    except:
        return JsonResponse({ "message": "fetching submission failed" }, status=400)
    return JsonResponse({ "data": enriched_submission }, status=200)

def get_submission_history(request, patient_id):
    try:
        patient = Patient.objects.get(id=patient_id)
        enriched_submissions = [] 
        submissions = Submission.objects.all().filter(patient=patient)
        for submission in submissions:
            submitted_eyes = SubmittedEye.objects.all().filter(submission=submission)
            enriched_submissions.append({"submission": SubmissionSerializer(submission, many=False).data, "submitted_eyes": SubmittedEyeSerializer(submitted_eyes, many=True).data})
    except Exception as e:
        return JsonResponse({ "message": "fetching patient's submission history failed" }, status=400)
    return JsonResponse({ "data": enriched_submissions }, status=200)