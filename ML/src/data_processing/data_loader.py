import pandas as pd, numpy as np
from ..visualization.visualize_data import simple_plot
from torch.utils.data import DataLoader
from torchvision.datasets import MNIST
from torchvision import transforms
import torch



#TODO process data into pytorch dataset, (tensor reprensentation)
# inspiration: https://towardsdatascience.com/building-custom-image-datasets-in-pytorch-15ba855b47cb
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


class GlaucomaData(torch._utils.data.Dataset):
    def __init___(self,setname,user="MC"):
        self.setname = setname #str, options: "train"/"test" - specifies part of dataset to fetch
        self.user = user
        self.selected_dataset_dir = self.get_dataset_paths()
        
        #TODO fix filenames and labels import 
        self.all_file_names = ["dummy","dummy"]
        self.all_labels = [0,1]

    def __len__(self):
        return len(self.all_file_names)

    def __getitem__(self,idx):
        selected_filename = self.all_file_names[idx]
        imagepil = PIL.Image(os.path.join(self.selected_dataset_dir,selected_filename)).convert("RGB")
        image = utils.to_tensor_and_normalize(imagepil)

        label = torch.Tensor(self.all_labels.loc[selected_filename,:].values)

        sample = {"data":image,
                   "label": label,
                   "idx": idx}
        return sample

    def get_dataset_paths(self, user=self.user):
        datasets_train = ["ML\data\raw\RIM-ONE_DL_images\partitioned_by_hospital\training_set\glaucoma"]
        datasets_test = ["ML\data\raw\RIM-ONE_DL_images\partitioned_by_hospital\training_set\normal"]
        return datasets_train, datasets_test



if __name__ == "__main__":
    print("Hello")


    #Normalize(mean=[R_mean,G_mean,B_mean],std =[R_std,G_std,B_std])
    
    #USE Compose([Normalize,Crop,Flip, etc.])
    
    
    
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