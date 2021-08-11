import requests
import json

#create tag : the tag name will come from the user
tag = "tag_name"
url_semi = "https://eastus.api.cognitive.microsoft.com/customvision/v3.0/training/projects/b2c99ecb-e43e-4a59-ac87-a189c109e267/tags?name="
url = url_semi+tag

headers = {
    'Training-Key': '',
    'Content-Type': 'application/json'

}

response = requests.post(url, headers=headers, )
data = response.json()

print(data)