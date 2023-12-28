from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import http.client
import re
import json

# Create your views here.
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def proxyHandler(request, **kwargs):
  method = request.method
  path = re.split(r'/api', request.path)[1]
  payload = request.data
  print("payload", type(payload))

  target_host = 'localhost'
  target_port = 3001
  connection = http.client.HTTPConnection(target_host, target_port)
  try:
    connection.request(method, path, json.dumps(payload))
    target_response = connection.getresponse()
    print(type(target_response))
    print(target_response.read().decode())
    return Response(target_response.read().decode(), status=status.HTTP_200_OK)
  except Exception as error:
    print(error)
    return Response({'error': 'Something went wrong!'}, status=status.HTTP_400_BAD_REQUEST)
