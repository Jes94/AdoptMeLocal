from django.urls import path
from . import views

urlpatterns = [
    path('<animal_id>/', views.get_comments),
    path('', views.add_comment),
    path('<pk>/delete/', views.del_comment)
]