import requests

headers = {
    'Training-Key': '660f5ff2178347299730d1dbee11d350',
    'Content-Type': 'application/json'

}

#Unpublish Iteration - Post

#Given ite_id from User

ite_id = "Put here"
url_semi1 = "https://eastus.api.cognitive.microsoft.com/customvision/v3.0/training/projects/b2c99ecb-e43e-4a59-ac87-a189c109e267/iterations/"
url_semi2 = "/publish"

url1 = ite_id + url_semi1 + url_semi2



response = requests.delete(url1, headers=headers)

# load the json data
data = response.json()
print(data)