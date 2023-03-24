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

#sys.path.insert(0, '')
