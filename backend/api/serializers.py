from rest_framework import serializers
from .models import Practioner, Patient, Submission, SubmittedEye

class PractionerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Practioner
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        exclude = ['author']
        depth = 1

class SubmittedEyeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubmittedEye
        fields = '__all__'