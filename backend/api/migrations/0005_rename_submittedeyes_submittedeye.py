# Generated by Django 4.1.7 on 2023-05-15 11:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_submittedeyes_eye_image_submittedeyes_image'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='SubmittedEyes',
            new_name='SubmittedEye',
        ),
    ]
