# Generated by Django 4.0.4 on 2022-07-05 17:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('favorites', '0003_favorite_shelter'),
    ]

    operations = [
        migrations.RenameField(
            model_name='favorite',
            old_name='contact',
            new_name='contactEmail',
        ),
        migrations.AddField(
            model_name='favorite',
            name='contactNumber',
            field=models.CharField(default='Not Provided', max_length=255),
            preserve_default=False,
        ),
    ]
