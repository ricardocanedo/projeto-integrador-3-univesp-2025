from django.urls import path
from .views import LoginView, ProtectedView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('protected/', ProtectedView.as_view(), name='protected'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]