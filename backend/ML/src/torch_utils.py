import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image
import io

#1 load model
###load model class
#class MyModel():
#    def __init__():
#   ....
#   ....
#   def forward..
#   return out

#model = MyModel(input_size, hidden_size, num_classes)
#PATH = "mnist_trained_ffn.pth"
#model.load(torch.load(PATH))
#model.eval()



#2 image -> tensor (same trans as train)
def transform_image(image_bytes):
    transform = transforms.Compose([transforms.Resize((224,224)),transforms.ToTensor(), transforms.Normalize((0.1308,),(0.2309))])
    image = Image.open(io.BytesIO(image_bytes)) 
    trans_image = transform(image).unsqueeze(0) # should be [1, 3, 224, 224]
    return trans_image
#3 predict

def get_prediction(image_tensor):
    model = torch.jit.load('backend/my_scripted_model.pt')
    output = model(image_tensor)
    probability = round(torch.nn.functional.softmax(output, dim=1).max().item(),3)
    predicted = torch.argmax(output).item()
    return {"prediction": predicted, "probability": probability}




#First step in deploying a model is to put the model into eval mode. Load model, the weights, and put into eval mode.
def prepare_moodel_for_deployment_tutorial(request):
    #model = MyModel()
    #model.load_state_dict(torch.load(my_weights_file))
    model = MobileNetV2ForImageClassification.from_pretrained("google/mobilenet_v2_1.0_224")

    model.eval()
    return model

# We will look into using torchscript.
# a statically-typed subset of python meant for ML.
# meant for consumption by the pytorch just-in-time compiler (JIT), which performs run-time optimizations on your Torchscript model.
# also allow one to serialize your trained model and load directly from this new format and deploying it for production inference.

def model_to_torchscript(model):
    my_script_model = torch.jit.script(model)
    my_script_model.save('my_scripted_model.pt')


def predict_w_torchscript_model(input_batch):
    model = torch.jit.load('my_scripted_model.pt')
    prediction_batch = model(input_batch)
    
    return prediction_batch


##### From flask guide, deploy deep learning model w. flask and heroku

def predict(request): #Should be post method
    #1. load image (get from request)
    #2. image -> tensor
    #3. prediction
    #4 return json
    pred = 'pred'
    return JsonResponse({'prediction': pred})
