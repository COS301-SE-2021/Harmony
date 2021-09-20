import requests

def train_model(event, context):

    headers = {
        'Training-Key': '',

    }



    url = "https://eastus.api.cognitive.microsoft.com/customvision/v1.1/Training/projects/b2c99ecb-e43e-4a59-ac87-a189c109e267/train"


    response = requests.post(url, headers=headers)

    # load the json data
    data = response.json()
    print(data)
    return {
        "StatusCode": 200,
        "Data": "Model has been trained"
    }


