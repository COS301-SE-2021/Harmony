import requests

def publish_iteration(event, context):

    Iter_Id = event["IterId"]
    Name = event["Name"]
    headers = {
        'Training-Key': '',
        'Content-Type': 'application/json'

    }

    #Publish Iteration

    url_semi1 = "https://eastus.api.cognitive.microsoft.com/customvision/v3.0/training/projects/b2c99ecb-e43e-4a59-ac87-a189c109e267/iterations/"
    url_semi2 = "/publish?publishName="
    url_semi3 = "&predictionId=/subscriptions/9743cd06-c1e6-428f-b2cd-d90421ba99d5/resourceGroups/AI_Harmony/providers/Microsoft.CognitiveServices/accounts/AIHarmony-Prediction"

    url = url_semi1 + Iter_Id + url_semi2 + Name + url_semi3
    response = requests.post(url, headers=headers)

    # load the json data
    data = response.json()
    print(data)
    return {
        "StatusCode": 200,
        "Data": "Iteration has been published"
    }





