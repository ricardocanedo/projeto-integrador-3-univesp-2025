from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('home', views.home, name='home'),
    path('area-de-atuacao/', views.area_de_atuacao, name='area_de_atuacao'),
    path('blog/', views.blog_list, name='blog_list'),
    path('blog/<slug:slug>/', views.blog_detail, name='blog_detail'),
    path('politica-de-privacidade/', views.politica_de_privacidade, name='politica_de_privacidade'),
    path('sobre/', views.sobre, name='sobre'),
]