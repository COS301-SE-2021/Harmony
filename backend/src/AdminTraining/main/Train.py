import requests

headers = {
    'Training-Key': '',

}

#Publish Iteration


url = "https://eastus.api.cognitive.microsoft.com/customvision/v1.1/Training/projects/b2c99ecb-e43e-4a59-ac87-a189c109e267/train"


response = requests.post(url, headers=headers)

# load the json data
data = response.json()
print(data)



