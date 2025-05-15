from django.urls import path
from rest_framework.routers import DefaultRouter
from .viewrs import PostViewSet

post_router = DefaultRouter()
post_router.register(r'posts', PostViewSet)