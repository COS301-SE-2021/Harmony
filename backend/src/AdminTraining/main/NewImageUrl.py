import requests


def new_image_url(event, context):
    # Take Url and TagID goes into body
    url = "https://eastus.api.cognitive.microsoft.com/customvision/v3.0/training/projects/b2c99ecb-e43e-4a59-ac87-a189c109e267/images/urls"
    imageurl = event['URL']
    tagid = event['TagID']

    headers = {
        'Training-Key': '',
        'Content-Type': 'application/json'

    }

    body = {
        "images": [
            {
                "url": imageurl
            }
        ],
        "tagIds": [
            tagid
        ]
    }

    response = requests.post(url, headers=headers, json=body)

    # load the json data
    data = response.json()
    return {"StatusCode": 200}
