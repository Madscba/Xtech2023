from os import walk
import os, re, pandas as pd

def get_folder_label(dataset: str,folder_name: str):
    if dataset == 'Glaucoma-dataset':
        if folder_name in ['Glaucoma', "Suspect Glaucoma 1","Suspect Glaucoma 2"]:
            return 1
        elif folder_name in ['Normal 1','Normal 2', 'Normal 3', 'Normal 4', 'Normal 5']:
            return 0
    elif dataset == 'retina_dataset':
        if folder_name == '2_glaucoma':
            return 1
        elif folder_name == "1_normal":
            return 0
    elif dataset == 'RIM-ONE_DL_images':
        if folder_name == 'glaucoma':
            return 1
        elif folder_name == "normal":
            return 0

def generate_annotations_from_img_folders(file_path,dataset_name):
    files = []
    labels = []
    for (dirpath, dirnames, filenames) in walk(file_path):
          temp_label = get_folder_label(dataset_name, dirpath.split("\\")[-1])
          if temp_label in [0,1]:
            for f in filenames:
                if '.jpg' in f or '.png' in f:
                    print(os.path.join(dirpath,f), f, temp_label)
                    files.append(os.path.join(dirpath,f))
                    labels.append(temp_label)
    return files,labels

if __name__ == "__main__":
    # root_dir = r"C:\Users\Mads-\Documents\Universitet\Kandidat\4_semester\Xtech\Xtech2023\ML\data\raw"
    root_dir = r"ML\data\raw"

    dataset_names = ['Glaucoma-dataset']
    # dataset_names = ['Glaucoma-dataset', 'retina_dataset', 'RIM-ONE_DL_images']

    files = []
    labels = []
    for idx,dataset_name in enumerate(dataset_names):
        temp_path = os.path.join(root_dir,dataset_name)
        temp_files,temp_labels = generate_annotations_from_img_folders(temp_path,dataset_name)
        if not idx:
            files, labels = temp_files, temp_labels
        else:
            files.append(temp_files)
            labels.append(temp_labels)
        datapath_and_labels = pd.DataFrame([files, labels]).T
        datapath_and_labels.to_csv(os.path.join(temp_path,"image_paths_and_labels.csv"))
        pd.DataFrame([labels]).T.to_csv(os.path.join(temp_path,"labels_only.csv"))
