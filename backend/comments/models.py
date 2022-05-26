from django.db import models
from authentication.models import User

# Create your models here.

class Comment(models.Model):
        user = models.ForeignKey(User, on_delete=models.CASCADE)
        animal_id = models.CharField(max_length=255)
        text = models.CharField(max_length=255)