from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', include('website.urls')),  # website URLs
    path('admin/', admin.site.urls), # Admin URLs
    path('api/', include('core.api.urls')), # API URLs
    path('authentication/', include('authentication.urls')),  # URLs de autenticação
    path('subscription/', include('subscription.urls')),  # URLs de inscrição
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
