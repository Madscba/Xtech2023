from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import requests, os
import numpy as np
    
    


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

    

if __name__ == "__main__":
    #alternative post.request format
    #requests.post(url, files = open('file.png','rb')) #read as binary.

    w_image = True
    if w_image:
        path_img = "ML/great_hammerhead_shark.jpg"
        url = "http://127.0.0.1:9000/ML/predict_transfer"
        print(os.getcwd())
        with open(path_img, 'rb') as img:
            name_img = os.path.basename(path_img)
            files= {'image': (name_img,img,'multipart/form-data',{'Expires': '0'}) }
            with requests.Session() as s:
                response = s.post(url,files=files)
                print(response.status_code,"\n",response.json(),"\n",response.text)

    else:
        url = 'http://127.0.0.1:9000/playground/ML_no_file_trans/'
        try:    
            response = requests.get(url)
        except:
            print("wrong port")
        try:
            response = requests.get(url)
        except:
            response = "nothing"
    print(response)


