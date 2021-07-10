import json
import requests
import base64

def identify_food_item(event, context):
    url = "https://aiharmony-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/b2c99ecb-e43e-4a59-ac87-a189c109e267/classify/iterations/Iteration1/image"

    headers = {
        # Request headers
        'Prediction-key': '',
        'Content-Type': 'application/octet-stream',
    }
    t = event['data'].encode("ascii")
    body = base64.decodebytes(t)
    response = requests.post(url, headers=headers, data=body)
    data = response.json()
    keyVal = 'predictions'

    if keyVal in data:
        a = data['predictions'][0]['tagName']
        b = data['predictions'][0]['probability']
        #print("Harmony has predicted a", a, " with a probability of", b)
        return a
    else:
        #print("Predictions is not found in JSON data")
        a = "An error has occurred"
        b = data
        #print(a,b)
        return a


