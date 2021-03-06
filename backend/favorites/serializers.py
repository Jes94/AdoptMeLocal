from rest_framework import serializers
from .models import Favorite

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ["id", "user", "animal_id","name","picture","breed","age","house_trained","neutered","kids","dogs","cats","contactEmail", "contactNumber","shelter"]
        depth = 1