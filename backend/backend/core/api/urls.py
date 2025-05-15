from rest_framework.routers import DefaultRouter
from posts.api.urls import post_router
from django.urls import path, include
from .views import AnalyticsView
from .views import PostDetailView, PopularPostsAnalyticsView, SubscriptionsListView

router = DefaultRouter()

# posts
router.registry.extend(post_router.registry)

urlpatterns = [
    path('', include(router.urls)),
]

urlpatterns += [
    path('analytics/', AnalyticsView.as_view(), name='analytics'),
]

urlpatterns += [
    path('posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
]

urlpatterns += [
    path('analytics/popular-posts/', PopularPostsAnalyticsView.as_view(), name='popular-posts-analytics'),
]

urlpatterns += [
    path('analytics/subscriptions/', SubscriptionsListView.as_view(), name='subscriptions-list'),
]   

#comments

