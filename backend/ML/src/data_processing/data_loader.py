import pandas as pd, numpy as np
from visualization.visualize_data import simple_plot
from torch.utils.data import (DataLoader,Dataset)
from torchvision.datasets import MNIST
from torchvision import transforms
import torch, os
from PIL import Image

#Data available for class
#RIM-ONE_DL: 170 img, 50 w. G.
#Retina: 400 img, 101 w. G.
#Glaucoma 350 img, 100 supect G, 32 w. G 



#TODO process data into pytorch dataset, (tensor reprensentation)
# inspiration: https://towardsdatascience.com/building-custom-image-datasets-in-pytorch-15ba855b47cb
# medical image processing steps: https://github.com/rachellea/ct-net-models
#TODO import relevant model(s)
#TODO (algorithm selection?)
#TODO train model, https://huggingface.co/docs/transformers/training#training-hyperparameters
#TODO tune model
#TODO evaluate model

class GlaucomaDataset(Dataset):
    def __init__(self,root_dir: str,dataset_paths: list, transform = None):
        self.root_dir = root_dir
        self.dataset_paths = dataset_paths
        self.transform = transform
        self.image_paths,self.labels  = self.get_img_paths_and_labels(dataset_paths)
         
    def __len__(self):
        return len(self.labels)

    def __getitem__(self,idx):
        img_path = os.path.join(self.root_dir, self.image_paths[idx])
        image = Image.open(img_path)
        # simple_plot(image)
        # image = transforms.PILToTensor(image)
        label = self.labels[idx]
        # label = torch.Tensor(self.labels[idx])
        
        if self.transform:
            image = self.transform(image)
        return (image,label)

    def get_img_paths_and_labels(self,dataset_paths):
        if len(dataset_paths) == 1:
            img_path_and_labels = pd.read_csv(os.path.join(self.root_dir,r"ML\data\raw",dataset_paths[0]))
            return img_path_and_labels.iloc[:,1],img_path_and_labels.iloc[:,2]
        else:
            #TODO fix import of several datasets 
            raise ValueError("ERROR in get_annotations(): Handling {} paths not implemented yet!".format(len(dataset_paths)))
    # def test_getitem(self,idx):
    #         img_path = os.path.join(self.root_dir, self.image_paths[idx])
    #         image = Image.open(img_path)
    #         simple_plot(image)
    #         image = transforms.PILToTensor(image)
    #         label = torch.Tensor(self.labels[idx])
            
    #         if self.transform:
    #             image = self.transform(image)
    #         return (image,label)
if __name__ == "__main__":
    print("Hello")


    #Normalize(mean=[R_mean,G_mean,B_mean],std =[R_std,G_std,B_std])
    
    #USE Compose([Normalize,Crop,Flip, etc.])
    
    
    
    # data_train = MNIST('~/mnist_data', train=True, download=True, transform=transforms.ToTensor())

    # data_loader = DataLoader(
    # data_train, 
    # batch_size=16, 
    # shuffle=False, 
    # sampler=None, 
    # # batch_sampler=None, 
    # num_workers=0
    # # ,collate_fn=None, 
    # # pin_memory=False, 
    # # drop_last=False, 
    # # timeout=0, 
    # # worker_init_fn=None, 
    # # multiprocessing_context=None, 
    # # generator=None, 
    # # *, 
    # # prefetch_factor=2, 
    # # persistent_workers=False
    # )

    # simple_plot(data_loader,samples=1)

    # #Iteration over data_loader
    # for idx, batch in enumerate(data_loader):
    #     print('Batch index: ', idx)
    #     print('Batch size: ', batch[0].size())
    #     print('Batch label: ', batch[1])
    #     break

    # #Accessing data and targets from data_loader
    # for idx, (data, target) in enumerate(data_loader):
    #     print(data[0])
    #     print(target[0])
    #     break


    # #moving data to GPUs
    # device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    # for idx, (data, target) in enumerate(data_loader):
    #     data = data.to(device)
    #     target = target.to(device)