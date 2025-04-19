from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.api.urls')),
    path('authentication/', include('authentication.urls')),  # Inclua as URLs do app authentication
]
