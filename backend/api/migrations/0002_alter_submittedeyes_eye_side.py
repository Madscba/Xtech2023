# Generated by Django 4.1.7 on 2023-05-15 10:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='submittedeyes',
            name='eye_side',
            field=models.CharField(blank=True, choices=[('left', 'left'), ('right', 'right')], max_length=20, null=True),
        ),
    ]