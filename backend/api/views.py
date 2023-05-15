from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt 
import json
import requests, sys, os, piq
from .serializers import PatientSerializer, SubmissionSerializer
from .models import Patient, Submission, SubmittedEye
from .utils import encode_request_data

#TODO: remove @csrf_exempt
@csrf_exempt
def create_patient(request):
    try:
        if request.method == 'POST':
            #NOTE: the additional user data is not stored for now due to gdpr concerns
            #NOTE: no backend validation yet
            patient_data = encode_request_data(request)
            patient = Patient(first_name=patient_data['firstname'], last_name=patient_data['lastname'], email=patient_data['email'], birth_year=patient_data['birthyear'])
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
            submission = Submission(patient=patient, status="open")
            submission.save()
            if request.FILES["right_eye"]: 
                submitted_eye = SubmittedEye(eye_side="right", image=request.FILES["right_eye"], submission=submission)
                submitted_eye.save()
            if request.FILES["left_eye"]: 
                submitted_eye = SubmittedEye(eye_side="left", image=request.FILES["left_eye"], submission=submission)
                submitted_eye.save()
    except Exception as e:
        print(e)
        return JsonResponse({ "message": "submission creation failed" }, status=400)
    return JsonResponse({ "message": "submission was created successfully" }, status=200)
