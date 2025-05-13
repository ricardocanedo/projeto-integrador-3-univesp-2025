from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Subscription
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django_ratelimit.decorators import ratelimit

@ratelimit(key='ip', rate='5/m', block=True) # Limita 5 requisições por minuto
def subscribe(request):
    if request.method == "POST":
        email = request.POST.get("email")

        if not email:
            return JsonResponse({"message": "E-mail não fornecido."}, status=400)

        try:
        
            validate_email(email)  # Valida formato do e-mail
            subscription, created = Subscription.objects.get_or_create(email=email)
            if created:
                return JsonResponse({"message": "Cadastro realizado com sucesso! Você receberá novidades em breve!"})
            else:
                return JsonResponse({"message": "Este e-mail já está cadastrado. Aguarde mais novidades!"})
        except ValidationError:
            return JsonResponse({"message": "E-mail inválido. Por favor revise os dados."}, status=400)
    return JsonResponse({"message": "Erro no cadastro."}, status=400)

# # TO DO - Implementar a funcionalidade de unsubscribe
# @ratelimit(key='ip', rate='5/m', block=True) # Limita 5 requisições por minuto
# def unsubscribe(request, email):
#     if request.method == "POST":
#         try:
#             subscription = Subscription.objects.get(email=email)
#             subscription.delete()
#             return JsonResponse({"message": "Inscrição removida com sucesso! Você não receberá mais novidades, assine novamente quando quiser. Até breve!"})
#         except Subscription.DoesNotExist:
#             return JsonResponse({"message": "E-mail não encontrado."}, status=404)
#     return JsonResponse({"message": "Erro ao remover o e-mail."}, status=400)