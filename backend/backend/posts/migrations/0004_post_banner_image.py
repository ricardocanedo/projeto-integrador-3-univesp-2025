# Generated by Django 5.1.1 on 2025-05-13 00:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0003_post_views_postviewstats'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='banner_image',
            field=models.ImageField(blank=True, null=True, upload_to='blog/banners/'),
        ),
    ]
