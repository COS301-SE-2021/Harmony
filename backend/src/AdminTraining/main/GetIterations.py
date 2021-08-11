import requests
import json
import boto3


def get_iterations(event, context):
    url = "https://eastus.api.cognitive.microsoft.com/customvision/v3.0/training/projects/b2c99ecb-e43e-4a59-ac87-a189c109e267/iterations"



    # training key not set for security purposes
    headers = {
        'Training-Key': '',
        'Content-Type': 'application/json'

    }

    response = requests.get(url, headers=headers)

    # load the json data
    data = response.json()
    print(data)
    return data
