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
from prediction.models import Users
from collections import defaultdict

@csrf_exempt
def compress_img_size(request):
    """
    Purpose: test function. Test if image (represented as bytes) can be transferred from client with POST HTTP method.
    Then loaded, transformed and inference run from the server side, and result returned.
    Result: Yes, it works.
    Returns Json response with ML prediction as part of text.
    """
    size = 512, 512
    img_data = request.FILES['image'].read()
    img_data.resize(size, Image.ANTIALIAS)

    #or alternatively just save in resized format
    #im_resized.save("image_resized.png", quality=95, optimize=True)
    #TODO: 
    try:
        pass
        resp_dict = {"msg": "Successfully saved to database"}
    except:
        resp_dict = {"msg": "Cannot save to database"}

    return JsonResponse(resp_dict)

@csrf_exempt
def push_personal_info_form_to_db(request):
    temp_user = defaultdict(list)
    #[temp_user[key] = None for key in ['id', 'email', 'first_name', 'last_name', 'gender', 'birth_year', 'user_password', 'user_type', 'practioner_id']]
    try:
        b = dict(request.POST)
    except:
        raise
    for key,val in request.POST.items():
        print(f'{key} : {val}')
        temp_user[key] = val

    a = 2
    temp_user.save()
    pass
