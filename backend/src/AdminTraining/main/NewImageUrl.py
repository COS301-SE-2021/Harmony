import requests


url = "https://eastus.api.cognitive.microsoft.com/customvision/v3.0/training/projects/b2c99ecb-e43e-4a59-ac87-a189c109e267/images/urls"



headers = {
    'Training-Key': '',
    'Content-Type': 'application/json'

}

body ={
        "images": [
            {
                "url": "UrlImage"
            }
        ],
        "tagIds": [
            "Tag Id"
        ]
    }


response = requests.post(url, headers=headers, json=body)

# load the json data
data = response.json()
print(data)