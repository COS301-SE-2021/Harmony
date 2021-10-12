import requests

def unpublish_iteration(event, context):

    headers = {
        'Training-Key': '',
        'Content-Type': 'application/json'

    }

    #Unpublish Iteration - Post

    #Given ite_id from User

    ite_id = event["IterId"]
    url_semi1 = "https://eastus.api.cognitive.microsoft.com/customvision/v3.0/training/projects/b2c99ecb-e43e-4a59-ac87-a189c109e267/iterations/"
    url_semi2 = "/publish"

    url1 = url_semi1 + ite_id + url_semi2



    requests.delete(url1, headers=headers)

    # load the json data
    return {
        "StatusCode" : 200,
        "Data" : "Iteration is unpublished"
    }