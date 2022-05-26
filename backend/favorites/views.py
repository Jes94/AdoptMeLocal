from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from favorites.models import Favorite
from favorites.serializers import FavoriteSerializer
from django.core.exceptions import ObjectDoesNotExist

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def favorite_views(request):
    if request.method == "GET":
        try:
            favorites = Favorite.objects.filter(user=request.user)
        except ObjectDoesNotExist:
            return Response({"error":"No favorites found for that user."})
        serializer = FavoriteSerializer(favorites, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
