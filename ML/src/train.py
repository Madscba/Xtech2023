# Imports
import torch
import torch.nn as nn  # All neural network modules, nn.Linear, nn.Conv2d, BatchNorm, Loss functions
import torch.optim as optim  # For all Optimization algorithms, SGD, Adam, etc.
import torchvision.transforms as transforms  # Transformations we can perform on our dataset
import torchvision
import os
import pandas as pd
from PIL import Image
from torch.utils.data import (
    Dataset,
    DataLoader,
)  # Gives easier dataset managment and creates mini batches
from data_processing.data_loader import GlaucomaDataset
from transformers import AutoImageProcessor, MobileNetV2ForImageClassification


#Visualize data, and general workflow. https://www.pluralsight.com/guides/image-classification-with-pytorch
#or alternatively amateur video: https://www.youtube.com/watch?v=Fxy6WTnUIww
# Set device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Hyperparameters
in_channel = 3
num_classes = 2
learning_rate = 3e-4
batch_size = 32
num_epochs = 1000

transform_mobile_net = transforms.Compose(
    [transforms.Resize(224),
     transforms.ToTensor(), #Pytorch default backend 46 for images are Pillow, and when you use ToTensor() class, PyTorch automatically converts all images into [0,1].
     transforms.Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225))])

# Load Data
dataset = GlaucomaDataset(
    root_dir= os.getcwd(),
    dataset_paths=['Glaucoma-dataset\image_paths_and_labels.csv'],
    transform=transform_mobile_net
)

# Dataset is actually a lot larger ~25k images, just took out 10 pictures
# to upload to Github. It's enough to understand the structure and scale
# if you got more images.


# transform_v2 = transforms.Compose( #options: https://pytorch.org/vision/stable/transforms.html
#     [transforms.ToTensor(),
#      transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))])


train_set, test_set = torch.utils.data.random_split(dataset, [0.8, 0.2])
train_loader = DataLoader(dataset=train_set, batch_size=batch_size, shuffle=True)
test_loader = DataLoader(dataset=test_set, batch_size=batch_size, shuffle=True)

# Model
#https://pytorch.org/hub/mateuszbuda_brain-segmentation-pytorch_unet/
#model = torchvision.models.mobilenet_v3_large(weights="DEFAULT")


#model.eval()
#my_script_model = torch.jit.script(model)
#my_script_model.save('my_scripted_model.pt')


model = torch.jit.load('my_scripted_model.pt')
for batch_idx, (data, targets) in enumerate(train_loader):
    # Get data to cuda if possible
    data = data.to(device=device)
    targets = targets.to(device=device)

    # forward
    scores = model(data)
# freeze all layers, change final linear layer with num_classes
for param in model.parameters():
    param.requires_grad = False

# final layer is not frozen
model.fc = nn.Linear(in_features=1024, out_features=num_classes)
model.to(device)

# Loss and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=learning_rate, weight_decay=1e-5)

# Train Network
for epoch in range(num_epochs):
    losses = []

    for batch_idx, (data, targets) in enumerate(train_loader):
        # Get data to cuda if possible
        data = data.to(device=device)
        targets = targets.to(device=device)

        # forward
        scores = model(data)
        loss = criterion(scores, targets)

        losses.append(loss.item())
        loss.requires_grad = True
        # backward
        optimizer.zero_grad()
        loss.backward()

        # gradient descent or adam step
        optimizer.step()

    print(f"Cost at epoch {epoch} is {sum(losses)/len(losses)}")

# Check accuracy on training to see how good our model is
def check_accuracy(loader, model):
    num_correct = 0
    num_samples = 0
    model.eval()

    with torch.no_grad():
        for x, y in loader:
            x = x.to(device=device)
            y = y.to(device=device)

            scores = model(x)
            _, predictions = scores.max(1)
            num_correct += (predictions == y).sum()
            num_samples += predictions.size(0)

        print(
            f"Got {num_correct} / {num_samples} with accuracy {float(num_correct)/float(num_samples)*100:.2f}"
        )

    model.train()


print("Checking accuracy on Training Set")
check_accuracy(train_loader, model)

print("Checking accuracy on Test Set")
check_accuracy(test_loader, model)
