from django.db import models
import os
from dotenv import load_dotenv
load_dotenv()


# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.

class DiagnosisEvents(models.Model):
    id = models.IntegerField(primary_key=True)
    created_at = models.DateTimeField()
    user = models.ForeignKey('Users', models.DO_NOTHING)
    practioner = models.ForeignKey('Users', models.DO_NOTHING, to_field='practioner_id', blank=True, null=True)


class Diseases(models.Model):
    id = models.IntegerField(primary_key=True)
    user = models.ForeignKey('Users', models.DO_NOTHING)
    disease_name = models.CharField(max_length=50, blank=True, null=True)

class SubmittedEyes(models.Model):
    id = models.IntegerField(primary_key=True)
    diagnosis_event = models.ForeignKey(DiagnosisEvents, models.DO_NOTHING)
    eye_side = models.CharField(max_length=20)
    feedback = models.CharField(max_length=1000, blank=True, null=True)
    feedback_created_at = models.DateTimeField(blank=True, null=True)
    user = models.ForeignKey('Users', models.DO_NOTHING)
    practioner = models.ForeignKey('Users', models.DO_NOTHING, to_field='practioner_id', blank=True, null=True)
    image_path = models.CharField(max_length=200, blank=True, null=True)

class UserGroup(models.Model):
    id = models.IntegerField(primary_key=True)
    practioner = models.ForeignKey('Users', models.DO_NOTHING, to_field='practioner_id', blank=True, null=True)



class Users(models.Model):
    id = models.IntegerField(primary_key=True)
    email = models.CharField(max_length=75, blank=True, null=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    gender = models.CharField(max_length=30, blank=True, null=True)
    birth_year = models.IntegerField()
    user_password = models.CharField(max_length=50)
    user_type = models.CharField(max_length=30)
    practioner_id = models.IntegerField(unique=True, blank=True, null=True)

