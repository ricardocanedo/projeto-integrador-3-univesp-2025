from django.test import TestCase
from django.urls import reverse
from .models import Post
from rest_framework.test import APITestCase
from rest_framework import status

class PostModelTest(TestCase):

    def setUp(self):
        self.post = Post.objects.create(
            title="Test Post",
            content="This is a test post content.",
            author="Test Author",
            slug="test-post",
        )

    def test_post_creation(self):
        self.assertEqual(self.post.title, "Test Post")
        self.assertEqual(self.post.author, "Test Author")
        self.assertEqual(self.post.slug, "test-post")

class PostViewTest(TestCase):

    def setUp(self):
        self.post = Post.objects.create(
            title="Test Post",
            content="This is a test post content.",
            author="Test Author",
            slug="test-post",
        )

    def test_post_list_view(self):
        response = self.client.get(reverse('blog_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Test Post")

    def test_post_detail_view(self):
        response = self.client.get(reverse('blog_detail', args=[self.post.slug]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "This is a test post content.")

class PostAPITest(APITestCase):

    def setUp(self):
        self.post = Post.objects.create(
            title="Test Post",
            content="This is a test post content.",
            author="Test Author",
            slug="test-post",
        )
        self.valid_data = {
            "title": "New Post",
            "content": "This is a new post content.",
            "author": "New Author",
            "slug": "new-post",
        }
        self.invalid_data = {
            "title": "",
            "content": "",
            "author": "",
            "slug": "",
        }

    def test_create_post(self):
        response = self.client.post('/api/posts/', self.valid_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 2)

    def test_create_post_invalid_data(self):
        response = self.client.post('/api/posts/', self.invalid_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_post(self):
        response = self.client.put(f'/api/posts/{self.post.id}/', {
            "title": "Updated Post",
            "content": "Updated content.",
            "author": "Updated Author",
            "slug": "updated-post",
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.post.refresh_from_db()
        self.assertEqual(self.post.title, "Updated Post")

    def test_delete_post(self):
        response = self.client.delete(f'/api/posts/{self.post.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Post.objects.count(), 0)
