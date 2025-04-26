from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('website.urls')),  # website URLs
    path('admin/', admin.site.urls),
    path('api/', include('core.api.urls')),
    path('authentication/', include('authentication.urls')),  # URLs de autenticação
]
