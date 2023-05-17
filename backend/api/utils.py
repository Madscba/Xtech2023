import json
from io import BytesIO
from PIL import Image
from django.core.files import File

#Helper functions
def encode_request_data(request):
    data_unicode = request.body.decode('utf-8')
    data = json.loads(data_unicode)
    return data

#TODO: add task queue for image compression
def compress_image(image):
    img = Image.open(image)
    img = img.convert("RGB")

    (w, h) = img.size  

    if w > 1000:
        new_size = (w//2, h//2) 
        img = img.resize(new_size, Image.ANTIALIAS)

    img_io = BytesIO() 
    img.save(img_io, 'JPEG', quality=70, optimize=True) 

    new_image = File(img_io, name=image.name)

    return new_image
