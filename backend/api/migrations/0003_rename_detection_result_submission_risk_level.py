# Generated by Django 4.1.7 on 2023-05-15 10:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_submittedeyes_eye_side'),
    ]

    operations = [
        migrations.RenameField(
            model_name='submission',
            old_name='detection_result',
            new_name='risk_level',
        ),
    ]