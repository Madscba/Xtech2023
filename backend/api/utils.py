import json

#Helper functions
def encode_request_data(request):
    data_unicode = request.body.decode('utf-8')
    data = json.loads(data_unicode)
    return data