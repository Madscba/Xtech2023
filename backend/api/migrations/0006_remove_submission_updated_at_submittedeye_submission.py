# Generated by Django 4.1.7 on 2023-05-15 11:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_rename_submittedeyes_submittedeye'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='submission',
            name='updated_at',
        ),
        migrations.AddField(
            model_name='submittedeye',
            name='submission',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.submission'),
        ),
    ]