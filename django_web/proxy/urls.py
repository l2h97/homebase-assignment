from django.urls import path

from . import views
from .views import proxyHandler

urlpatterns = [
    path('', proxyHandler),
    path('users', proxyHandler),
    path('users/<int:id>', proxyHandler),
]