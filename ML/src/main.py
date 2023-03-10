from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import requests
import numpy as np

if __name__ == "__main__":
    help(np.sqrt )
    
    


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