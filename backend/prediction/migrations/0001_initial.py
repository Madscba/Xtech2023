# Generated by Django 4.1.7 on 2023-05-13 00:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=200)),
                ('gender', models.CharField(blank=True, choices=[('diverse', 'diverse'), ('female', 'female'), ('male', 'male')], max_length=7, null=True)),
                ('ethnicity', models.CharField(blank=True, max_length=100, null=True)),
                ('diseases', models.TextField(blank=True, null=True)),
                ('birth_year', models.IntegerField(blank=True, null=True)),
                ('admin', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Practioner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='SubmittedEyes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('eye_side', models.CharField(blank=True, max_length=20, null=True)),
                ('eye_image', models.CharField(blank=True, max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Submission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(blank=True, null=True)),
                ('status', models.CharField(blank=True, choices=[('open', 'open'), ('completed', 'completed')], max_length=50, null=True)),
                ('detection_result', models.IntegerField(blank=True, null=True)),
                ('detection_at', models.DateTimeField(blank=True, null=True)),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='prediction.patient')),
                ('practioner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='prediction.practioner')),
            ],
        ),
    ]