# Generated by Django 4.1.7 on 2023-05-15 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_detection_result_submission_risk_level'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='submittedeyes',
            name='eye_image',
        ),
        migrations.AddField(
            model_name='submittedeyes',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]