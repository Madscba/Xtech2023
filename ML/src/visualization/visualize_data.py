import matplotlib.pyplot as plt

def simple_plot(dataset,samples=3):
    for idx in range(samples):
        plt.imshow(dataset.data[idx])
        plt.show()