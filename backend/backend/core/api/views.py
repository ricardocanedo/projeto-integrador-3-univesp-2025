from django.db.models import Count
from django.db.models.functions import TruncMonth
from rest_framework.views import APIView
from rest_framework.response import Response
from posts.models import Post
from subscription.models import Subscription
from django.utils.timezone import now
from datetime import datetime, timedelta
from posts.models import PostViewStats
from django.db.models import F

class AnalyticsView(APIView):
    def get(self, request, *args, **kwargs):
        total_posts = Post.objects.count()
        total_newsletter = Subscription.objects.count()
        posts_by_author = Post.objects.values('author').annotate(count=Count('id'))
        posts_by_month = Post.objects.annotate(month=TruncMonth('created_at')).values('month').annotate(count=Count('id')).order_by('month')

        return Response({
            'total_posts': total_posts,
            'total_newsletter': total_newsletter,
            'posts_by_author': list(posts_by_author),
            'posts_by_month': list(posts_by_month),
        })

class PostDetailView(APIView):
    def get(self, request, pk, *args, **kwargs):
        try:
            post = Post.objects.get(pk=pk)
            post.views += 1
            post.save()

            # Atualizar ou criar registro no PostViewStats
            current_month_year = now().strftime('%Y-%m')
            stats, created = PostViewStats.objects.get_or_create(
                post=post,
                month_year=current_month_year,
                defaults={'views': 0}
            )
            stats.views += 1
            stats.save()

            return Response({
                'id': post.id,
                'title': post.title,
                'content': post.content,
                'views': post.views,
            })
        except Post.DoesNotExist:
            return Response({'error': 'Post not found'}, status=404)

class PopularPostsAnalyticsView(APIView):
    def get(self, request, *args, **kwargs):
        one_year_ago = now() - timedelta(days=365)
        stats = PostViewStats.objects.filter(
            month_year__gte=one_year_ago.strftime('%Y-%m')
        ).annotate(
            post_title=F('post__title')
        ).values('post_title', 'month_year', 'views').order_by('month_year')

        return Response(list(stats))
    
class SubscriptionsListView(APIView):
    def get(self, request, *args, **kwargs):
        subscriptions = Subscription.objects.all()

        return Response({
            'subscriptions': list(subscriptions.values('email', 'created_at'))
        })