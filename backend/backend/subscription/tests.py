from django.test import TestCase
from django.urls import reverse
from .models import Subscription

class SubscriptionTests(TestCase):
    def test_successful_subscription(self):
        """Testa se um e-mail válido é cadastrado corretamente."""
        response = self.client.post(reverse("subscribe"), {"email": "teste@example.com"}, HTTP_X_FORWARDED_FOR="127.0.0.1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["message"], "Cadastro realizado com sucesso! Você receberá novidades em breve!")
        self.assertTrue(Subscription.objects.filter(email="teste@example.com").exists())

    def test_duplicate_email(self):
        """Testa se um e-mail já cadastrado retorna uma mensagem apropriada."""
        Subscription.objects.create(email="teste@example.com")
        response = self.client.post(reverse("subscribe"), {"email": "teste@example.com"}, HTTP_X_FORWARDED_FOR="127.0.0.1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["message"], "Este e-mail já está cadastrado. Aguarde mais novidades!")

    def test_invalid_email(self):
        """Testa se um e-mail inválido retorna erro."""
        response = self.client.post(reverse("subscribe"), {"email": "email-invalido"}, HTTP_X_FORWARDED_FOR="127.0.0.1")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["message"], "E-mail inválido. Por favor revise os dados.")

    def test_missing_email(self):
        """Testa se uma requisição sem e-mail retorna erro."""
        response = self.client.post(reverse("subscribe"), {}, HTTP_X_FORWARDED_FOR="127.0.0.1")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["message"], "E-mail não fornecido.")
