import requests
import json
import boto3


def create_tag(event, context):
    # create tag : the tag name will come from the user input

    tagname = event['TagName']
    type = event['Type']
    url_semi1 = "https://eastus.api.cognitive.microsoft.com/customvision/v3.0/training/projects/b2c99ecb-e43e-4a59-ac87-a189c109e267/tags?name="
    url_semi2 = "&type="
    url = url_semi1 + tagname + url_semi2 + type

    headers = {
        'Training-Key': '',
        'Content-Type': 'application/json'

    }

    response = requests.post(url, headers=headers, )

    # load the json data
    data = response.json()
    return {"StatusCode": 200,
            "data": data}
