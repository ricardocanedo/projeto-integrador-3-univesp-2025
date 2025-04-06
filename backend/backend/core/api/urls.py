from rest_framework.routers import DefaultRouter
from posts.api.urls import post_router
from django.urls import path, include

router = DefaultRouter()

# posts
router.registry.extend(post_router.registry)

urlpatterns = [
    # path('api/v1/', include(router.urls)),
    path('', include(router.urls)),
]


#comments

