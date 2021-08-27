import requests
import json
import boto3
def create_tag(event, context):
    
    tagID = "c4791196-b1ad-4dba-b06a-4e2d2058ad08"
    url_semi = "https://eastus.api.cognitive.microsoft.com/customvision/v3.0/training/projects/b2c99ecb-e43e-4a59-ac87-a189c109e267/tags/"
    url = url_semi + tagID

    headers = {
        'Training-Key': '660f5ff2178347299730d1dbee11d350',

    }

    response = requests.delete(url, headers=headers)
    data = "Done"
# Check if it didnt fail and send data
    return data