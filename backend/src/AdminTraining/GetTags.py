import requests
import json

url = "https://eastus.api.cognitive.microsoft.com/customvision/v3.0/training/projects/b2c99ecb-e43e-4a59-ac87-a189c109e267/tags?iterationId=3"

body = {}
headers = {
    'Training-Key': '660f5ff2178347299730d1dbee11d350',
    'Content-Type': 'application/json'

}

response = requests.get(url, headers=headers)
# print(response.content)
# load the json data
data = response.json()

print(data)
