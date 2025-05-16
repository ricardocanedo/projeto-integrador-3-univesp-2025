from django.test import TestCase
from django.urls import reverse
from posts.models import Post

class WebsiteViewTest(TestCase):

    def test_home_view(self):
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Atuação especializada em defesa médica complexa')

    def test_sobre_view(self):
        response = self.client.get(reverse('sobre'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Sobre')

    def test_area_de_atuacao_view(self):
        response = self.client.get(reverse('area_de_atuacao'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Áreas de Atuação')

    def test_politica_de_privacidade_view(self):
        response = self.client.get(reverse('politica_de_privacidade'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Política De Privacidade')

class BlogViewTest(TestCase):

    def setUp(self):
        self.post = Post.objects.create(
            title="Test Blog Post",
            content="This is a test blog post content.",
            author="Test Author",
            slug="test-blog-post",
        )

    def test_blog_list_view(self):
        response = self.client.get(reverse('blog_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Test Blog Post")

    def test_blog_detail_view(self):
        response = self.client.get(reverse('blog_detail', args=[self.post.slug]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "This is a test blog post content.")
