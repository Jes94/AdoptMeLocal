from django.db import models
from authentication.models import User

# Create your models here.

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    animal_id = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    house_trained = models.CharField(max_length=255)
    picture = models.CharField(max_length=255)
    breed = models.CharField(max_length=255)
    age = models.CharField(max_length=255)
    neutered = models.CharField(max_length=255)
    kids = models.CharField(max_length=255)
    dogs = models.CharField(max_length=255)
    cats = models.CharField(max_length=255)
    contact = models.CharField(max_length=255)
    shelter = models.CharField(max_length=255)