from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# Create your views here.
from transformers import AutoImageProcessor, MobileNetV2ForImageClassification
import torch, io
from datasets import load_dataset
import requests, sys, os, piq
from PIL import Image
from io import StringIO
from django.views.decorators.csrf import csrf_exempt 
sys.path.insert(0, '')
from ML.src.torch_utils import *


def index(request):
    return render(request, 'eyeopener/hello.html', {})

@csrf_exempt
def machine_learning_test(request):
    """
    Purpose: test function. Test if local file can be loaded, transformed and inference run, and result returned.
    Result: Yes, it works.
    Returns response that is simple HTML with ML prediction as part of text.
    """
    image = Image.open('backend/stingray.jpg')
    image_processor = AutoImageProcessor.from_pretrained("google/mobilenet_v2_1.0_224")
    model = MobileNetV2ForImageClassification.from_pretrained("google/mobilenet_v2_1.0_224")
    inputs = image_processor(image, return_tensors="pt")
    with torch.no_grad():
        logits = model(**inputs).logits
    predicted_label = logits.argmax(-1).item()
    probability = round(torch.nn.functional.softmax(logits, dim=1).max().item(),3)
    print(model.config.id2label[predicted_label])
    return render(request,'eyeopener/index.html',{'prediction': model.config.id2label[predicted_label],"probability": probability})
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
    probability = round(torch.nn.functional.softmax(logits, dim=1).max().item(),3)

    #print(model.config.id2label[predicted_label])
    msg = f'The probability of suffering from glaucoma is {probability} and we advice that you seek a doctor.' if probability > 0.6 else f'There was found no signs of having glaucoma! Check again in 6 months.'
    return JsonResponse({'prediction': model.config.id2label[predicted_label], "probability": probability, "msg": msg})



#TODO add error handling
ALLOWED_EXTENSIONS = {'png','jpg','jpeg'}
def allowed_file(filename):
    """
    Helper function used in the following function/view "predict"
    Checks if file extension of image is valid.
    """
    return True #'.' in filename and filename.rsplit('.',1)[-1].lower() in ALLOWED_EXTENSIONS


@csrf_exempt
def predict(request):
    """
    To be the predict view that we set in production"""
    if request.method == "POST":
        file = request.FILES['image']
        #file = request.files.get('file')
        if file is None:
            return JsonResponse({'error': 'no file'})
        if not allowed_file(file):
            return JsonResponse({'error': 'format not supported. Only .PNG, .JPG and .JPEG files are allowed'})

        #try:
        img_bytes = file.read()
        tensor = transform_image(img_bytes)
        
        prediction = get_prediction(tensor)
        return JsonResponse({'prediction': prediction.item()})

        #except:
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
    


    ################# Image quality views ########################
    
@csrf_exempt
def img_quality_local_test(request):
    """
    Purpose: test function. Test if local file can be loaded, transformed and inference run, and result returned.
    Result: Yes, it works.
    Returns response that is simple HTML with ML prediction as part of text.
    """
    image_input = Image.open('backend/stingray.jpg')
    image_reference = Image.open('backend/prediction/fundus_image_reference.jpg')

    brisque_score = round(piq.brisque(resize_and_to_torch(image_input), data_range=1., reduction='none').item(),3)
    DISTS_score = round(piq.DISTS(reduction='none')(resize_and_to_torch(image_reference), resize_and_to_torch(image_input)).item(),3)
    score_dict = {"brisque_score": brisque_score, "DISTS": DISTS_score}
    print(score_dict)
    return JsonResponse(score_dict)



#TODO add error handling

def resize_and_to_torch(img):
    img_resized = img.resize((256,256))
    transform = transforms.Compose([
    transforms.ToTensor()])
    img_tensor = transform(img_resized)
    img_tensor = torch.reshape(img_tensor.unsqueeze(1), (1, 3, 256, 256))
    return img_tensor

@csrf_exempt
def evaluate_img_quality(request):
    """
    To be the predict view that we set in production"""
    if request.method == "POST":
        file = request.FILES['image']
        #file = request.files.get('file')
        if file is None:
            return JsonResponse({'error': 'no file'})
        if not allowed_file(file):
            return JsonResponse({'error': 'format not supported. Only .PNG, .JPG and .JPEG files are allowed'})

        #try:
        img_bytes = file.read()
        PIL_img = transform_image(img_bytes, to_tensor=False)

        image_reference = Image.open('backend/prediction/fundus_image_reference.jpg')
        brisque_score = round(piq.brisque(resize_and_to_torch(PIL_img), data_range=1., reduction='none').item(),3)
        DISTS_score = round(piq.DISTS(reduction='none')(resize_and_to_torch(image_reference), resize_and_to_torch(PIL_img)).item(),3)
        score_dict = {"brisque_score": brisque_score, "DISTS": DISTS_score}

        return JsonResponse(score_dict)

    