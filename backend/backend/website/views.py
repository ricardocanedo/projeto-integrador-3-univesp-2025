from django.shortcuts import render, get_object_or_404
from posts.models import Post

def home(request):
    return render(request, 'website/home.html')

def area_de_atuacao(request):
    return render(request, 'website/area_de_atuacao.html')

def blog_list(request):
    posts = Post.objects.all()
    return render(request, 'website/blog_list.html', {'posts': posts})

def blog_detail(request, slug):
    post = get_object_or_404(Post, slug=slug)
    return render(request, 'website/blog_detail.html', {'post': post})

def politica_de_privacidade(request):
    return render(request, 'website/politica_de_privacidade.html')

def sobre(request):
    return render(request, 'website/sobre.html')
