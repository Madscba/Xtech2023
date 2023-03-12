from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# Create your views here.
from transformers import AutoImageProcessor, MobileNetV2ForImageClassification
import torch, io
from datasets import load_dataset
import requests, sys, os
from PIL import Image
from io import StringIO
from django.views.decorators.csrf import csrf_exempt 
sys.path.insert(0, '')
from ML.src.torch_utils import *


@csrf_exempt
def machine_learning_test(request):
    """
    Purpose: test function. Test if local file can be loaded, transformed and inference run, and result returned.
    Result: Yes, it works.
    Returns response that is simple HTML with ML prediction as part of text.
    """
    image = Image.open('stingray.jpg')
    image_processor = AutoImageProcessor.from_pretrained("google/mobilenet_v2_1.0_224")
    model = MobileNetV2ForImageClassification.from_pretrained("google/mobilenet_v2_1.0_224")
    inputs = image_processor(image, return_tensors="pt")
    with torch.no_grad():
        logits = model(**inputs).logits
    predicted_label = logits.argmax(-1).item()
    print(model.config.id2label[predicted_label])
    return render(request,'hello.html',{'name': model.config.id2label[predicted_label]})
    #return {'name': model.config.id2label[predicted_label]}

#TODO fix csrf hack, such that there is no vulnerability.
@csrf_exempt
def predict_dummy(request):
    """
    Purpose: test function. Test if image (represented as bytes) can be transferred from client with POST HTTP method.
    Then loaded, transformed and inference run from the server side, and result returned.
    Result: Yes, it works.
    Returns Json response with ML prediction as part of text.
    """
    img_data = request.FILES['image'].read()
    img = Image.open(io.BytesIO(img_data))
    image_processor = AutoImageProcessor.from_pretrained("google/mobilenet_v2_1.0_224")
    model = MobileNetV2ForImageClassification.from_pretrained("google/mobilenet_v2_1.0_224")
    inputs = image_processor(img, return_tensors="pt")
    with torch.no_grad():
        logits = model(**inputs).logits

    predicted_label = logits.argmax(-1).item()
    print(model.config.id2label[predicted_label])
    return JsonResponse({'prediction': model.config.id2label[predicted_label]})



ALLOWED_EXTENSIONS = {'png','jpg','jpeg'}
def allowed_file(filename):
    """
    Helper function used in the following function/view "predict"
    Checks if file extension of image is valid.
    """
    return '.' in filename and filename.rsplit('.',1)[-1].lower() in ALLOWED_EXTENSIONS


@csrf_exempt
def predict(request):
    """
    To be the predict view that we set in production"""
    if request.method == "POST":
        file = request.files.get('file')
        if file is None or file.filename =="":
            return JsonResponse({'error': 'no file'})
        if not allowed_file(file.filename):
            return JsonResponse({'error': 'format not supported. Only .PNG, .JPG and .JPEG files are allowed'})

        try:
            img_bytes = file.read()
            tensor = transform_image(img_bytes)

            prediction = get_prediction(tensor)
            return JsonResponse({'prediction': prediction.item()})

        except:
            return JsonResponse({'error': 'error during prediction'})

        img_data = request.FILES['image'].read()
        img = Image.open(io.BytesIO(img_data))
        #img.save("test_if_image_loads.jpg")
        image_processor = AutoImageProcessor.from_pretrained("google/mobilenet_v2_1.0_224")
        model = MobileNetV2ForImageClassification.from_pretrained("google/mobilenet_v2_1.0_224")
        inputs = image_processor(img, return_tensors="pt")

        with torch.no_grad():
            logits = model(**inputs).logits

        # model predicts one of the 1000 ImageNet classes
        predicted_label = logits.argmax(-1).item()
        print(model.config.id2label[predicted_label])
        #return render(request,'hello.html',{'name': model.config.id2label[predicted_label]})
        return JsonResponse({'prediction': model.config.id2label[predicted_label]})