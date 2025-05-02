from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User

class AuthenticationTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')

    def test_login(self):
        response = self.client.post(reverse('login'), {'username': 'testuser', 'password': 'testpassword'})
        self.assertEqual(response.status_code, 200)

    def test_logout(self):
        self.client.login(username='testuser', password='testpassword')
        response = self.client.get(reverse('logout'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Logout realizado com sucesso.")

        # Test if authenticated route is no longer accessible
        protected_response = self.client.get(reverse('protected'))
        self.assertEqual(protected_response.status_code, 401)
