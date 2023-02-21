import pandas as pd, numpy as np
from ..visualization.visualize_data import simple_plot
from torch.utils.data import DataLoader
from torchvision.datasets import MNIST
from torchvision import transforms
import torch

#TODO process data into pytorch dataset, (tensor reprensentation)
#TODO import relevant model(s)
#TODO (algorithm selection?)
#TODO train model, https://huggingface.co/docs/transformers/training#training-hyperparameters
#TODO tune model
#TODO evaluate model

BATCH_SIZE = 16

#Data available for class
#RIM-ONE_DL: 170 img, 50 w. G.
#Retina: 400 img, 101 w. G.
#Glaucoma 350 img, 100 supect G, 32 w. G 



if __name__ == "__main__":
    print("Hello")


    data_train = MNIST('~/mnist_data', train=True, download=True, transform=transforms.ToTensor())

    data_loader = DataLoader(
    data_train, 
    batch_size=BATCH_SIZE, 
    shuffle=False, 
    sampler=None, 
    # batch_sampler=None, 
    num_workers=0
    # ,collate_fn=None, 
    # pin_memory=False, 
    # drop_last=False, 
    # timeout=0, 
    # worker_init_fn=None, 
    # multiprocessing_context=None, 
    # generator=None, 
    # *, 
    # prefetch_factor=2, 
    # persistent_workers=False
    )

    simple_plot(data_loader,samples=1)

    #Iteration over data_loader
    for idx, batch in enumerate(data_loader):
        print('Batch index: ', idx)
        print('Batch size: ', batch[0].size())
        print('Batch label: ', batch[1])
        break

    #Accessing data and targets from data_loader
    for idx, (data, target) in enumerate(data_loader):
        print(data[0])
        print(target[0])
        break


    #moving data to GPUs
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    for idx, (data, target) in enumerate(data_loader):
        data = data.to(device)
        target = target.to(device)