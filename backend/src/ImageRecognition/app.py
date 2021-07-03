import requests
import json

def lambda_handler(event, context):

    url = "https://aiharmony-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/b2c99ecb-e43e-4a59-ac87-a189c109e267/classify/iterations/Iteration1/url"

    body = {
        "Url": "https://thestayathomechef.com/wp-content/uploads/2016/06/The-Most-Amazing-Chocolate-Cake-Square-1.jpg"}
    headers = {
        'Prediction-Key': '',
        'Content-Type': 'application/json'
    }

    response = requests.post(url, headers=headers, data=json.dumps(body))

    # load the json data
    data = response.json()
    a = data['predictions'][0]['tagName']
    print("Harmony has predicted a", a)

    return a