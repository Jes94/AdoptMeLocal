from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from favorites.models import Favorite
from favorites.serializers import FavoriteSerializer
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def favorite_views(request):
    if request.method == "GET":
        try:
            favorites = Favorite.objects.filter(user=request.user)
        except ObjectDoesNotExist:
            return Response({"No favorites found for that user."}, status=status.HTTP_204_NO_CONTENT)
        serializer = FavoriteSerializer(favorites, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == "POST":
        serializer = FavoriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def favorite_delete(request, pk):
    favorite = get_object_or_404(Favorite, pk=pk)
    favorite.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
