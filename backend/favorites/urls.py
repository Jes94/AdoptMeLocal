from django.urls import path
from favorites import views

urlpatterns = [
    path('', views.favorite_views),
]
