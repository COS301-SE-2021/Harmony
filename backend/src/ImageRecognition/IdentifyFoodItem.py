import json
import requests


def identify_food_item(event, context):
    url = "https://aiharmony-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/b2c99ecb-e43e-4a59-ac87-a189c109e267/classify/iterations/Iteration1/url"

    body = {
        "Url": "https://thestayathomechef.com/wp-content/uploads/2016/06/The-Most-Amazing-Chocolate-Cake-Square-1.jpg"}
    headers = {
        'Prediction-Key': '606bb8fd69394bc2bf192a8453995342',
        'Content-Type': 'application/json'
    }

    response = requests.post(url, headers=headers, data=json.dumps(body))
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


