from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# Create your views here.
import requests, sys, os
import piq
import torch
from PIL import Image
from io import StringIO
from django.views.decorators.csrf import csrf_exempt 
from ML.src.torch_utils import transform_image
import torchvision.transforms as transforms
from collections import defaultdict
from api.utils import encode_request_data
from rest_framework_simplejwt.tokens import RefreshToken

@csrf_exempt
def logout(request):
    try:
        if request.method == 'POST':
            token_data = encode_request_data(request)
            token = RefreshToken(token_data['refresh_token'])
            token.blacklist()
    except:
        return JsonResponse({ "message": "logging out failed" }, status=400)
    return JsonResponse({ "message": "logged out successfully" }, status=200)

# @csrf_exempt
# def compress_img_size(request):
#     """
#     Purpose: test function. Test if image (represented as bytes) can be transferred from client with POST HTTP method.
#     Then loaded, transformed and inference run from the server side, and result returned.
#     Result: Yes, it works.
#     Returns Json response with ML prediction as part of text.
#     """
#     size = 512, 512
#     img_data = request.FILES['image'].read()
#     img_data.resize(size, Image.ANTIALIAS)

#     #or alternatively just save in resized format
#     #im_resized.save("image_resized.png", quality=95, optimize=True)
#     #TODO: 
#     try:
#         pass
#         resp_dict = {"msg": "Successfully saved to database"}
#     except:
#         resp_dict = {"msg": "Cannot save to database"}

#     return JsonResponse(resp_dict)