# Generated by Django 4.1.7 on 2023-05-15 18:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_submission_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='submission',
            name='detection_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
