from django.shortcuts import render

def home(request):
    return render(request, 'website/home.html')

def area_de_atuacao(request):
    return render(request, 'website/area_de_atuacao.html')

def blog_list(request):
    return render(request, 'website/blog_list.html')

def blog_detail(request, slug):
    return render(request, 'website/blog_detail.html', {'slug': slug})

def politica_de_privacidade(request):
    return render(request, 'website/politica_de_privacidade.html')

def sobre(request):
    return render(request, 'website/sobre.html')
