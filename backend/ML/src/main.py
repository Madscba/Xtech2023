from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import requests, os
import numpy as np
import piq
import torch
import torchvision.transforms as transforms



# requests.get('https://download.pytorch.org/models/densenet161-8d451a50.pth')
# #Test import of model and do inference.
# url = "http://images.cocodataset.org/val2017/000000039769.jpg"
# image = Image.open(requests.get(url, stream=True).raw)

# preprocessor = AutoImageProcessor.from_pretrained("google/mobilenet_v2_1.4_224")
# model = AutoModelForImageClassification.from_pretrained("google/mobilenet_v2_1.4_224")

# inputs = preprocessor(images=image, return_tensors="pt")

# outputs = model(**inputs)
# logits = outputs.logits

# # model predicts one of the 1000 ImageNet classes
# predicted_class_idx = logits.argmax(-1).item()
# print("Predicted class:", model.config.id2label[predicted_class_idx])

    




def test_ml():
        #alternative post.request format
    #requests.post(url, files = open('file.png','rb')) #read as binary.
    w_image = True
    if w_image:
        path_img = "ML/great_hammerhead_shark.jpg"
        url = "http://127.0.0.1:9000/ML/predict"
        print(os.getcwd())
        with open(path_img, 'rb') as img:
            name_img = os.path.basename(path_img)
            files= {'image': (name_img,img,'multipart/form-data',{'Expires': '0'}) }
            with requests.Session() as s:
                response = s.post(url,files=files)
                print(response.status_code,"\n",response.text)


def transform_image(img):
    img_resized = img.resize((256,256))
    transform = transforms.Compose([
    transforms.ToTensor()])
    img_tensor = transform(img_resized)
    img_tensor = torch.reshape(img_tensor.unsqueeze(1), (1, 3, 256, 256))
    return img_tensor

def test_img_quality(img):
    img_tensor = transform_image(img)
    brisque_score = piq.brisque(img_tensor, data_range=1., reduction='none')
    return brisque_score


if __name__ == "__main__":
    img_to_be_assessed = ['stingray.jpg','/ML/great_hammerhead_shark.jpg','/ML/fundus-reference.jpg','/ML/fundus_img_quality1','/ML/fundus_img_quality2','/ML/fundus_img_quality3','/ML/fundus_img_quality4']
    image_reference = Image.open('stingray.jpg')

    for img_path in img_to_be_assessed:
        image_input = Image.open(img_path)
        brisque_score = test_img_quality(image_reference)
        DISTS_score = piq.DISTS(reduction='none')(image_reference, image_input)
        print(f'{img_path}: {brisque_score}, DISTS: {DISTS_score}')
    a = 2

