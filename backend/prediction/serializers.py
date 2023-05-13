from rest_framework import serializers
from .models import Practioner, Patient, Submission, SubmittedEyes

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
        fields = '__all__'

class SubmittedEyesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubmittedEyes
        fields = '__all__'