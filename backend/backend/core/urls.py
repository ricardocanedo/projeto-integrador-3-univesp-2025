from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', include('website.urls')),  # website URLs
    path('admin/', admin.site.urls),
    path('api/', include('core.api.urls')),
    path('authentication/', include('authentication.urls')),  # URLs de autenticação
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
