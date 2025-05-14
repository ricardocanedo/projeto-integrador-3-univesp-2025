from django.shortcuts import render, get_object_or_404
from django.utils.timezone import now
from posts.models import Post, PostViewStats

def home(request):
    posts = Post.objects.get_queryset().order_by('-created_at')[:4]  # Pega os 4 posts mais recentes
    return render(request, 'website/home.html', {'posts': posts})

def area_de_atuacao(request):
    return render(request, 'website/area_de_atuacao.html')

def blog_list(request):
    posts = Post.objects.all()
    return render(request, 'website/blog_list.html', {'posts': posts})

def blog_detail(request, slug):
    post = get_object_or_404(Post, slug=slug)

    # Incrementar o número de visualizações no modelo Post
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

    return render(request, 'website/blog_detail.html', {'post': post})

def politica_de_privacidade(request):
    return render(request, 'website/politica_de_privacidade.html')

def sobre(request):
    return render(request, 'website/sobre.html')
