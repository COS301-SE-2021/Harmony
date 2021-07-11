import json
import boto3
import requests
import base64
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError

"""
The aim of this lambda function is to receive a picture from the frontend
which is then put into our AI model. The model is expected to determine the type of 
food that the picture is, as long as it has been trained with that food.

Once the food is identified the system then performs a lookup in our DynamoDb
to find all relevant pairings of that food item.

All the relevant data is then returned as a JSON object back to the frontend.
"""

def identify_food_item(event, context):
    url = "https://aiharmony-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/b2c99ecb-e43e-4a59-ac87-a189c109e267/classify/iterations/Iteration3/image"

    headers = {
        # Request headers
        'Prediction-key': '606bb8fd69394bc2bf192a8453995342',
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
        # print("Harmony has predicted a", a, " with a probability of", b)
    else:
        # print("Predictions is not found in JSON data")
        # TODO: If error occures terminate.
        a = "An error has occurred"
        b = data
        # print(a,b)

    dynamodb = boto3.resource('dynamodb')

    # use the DynamoDB object to select our table
    table_name = 'Pairings'
    table = dynamodb.Table(table_name)

    try:
        is_table_existing = table.table_status in ("CREATING", "UPDATING", "DELETING", "ACTIVE")
    except ClientError:
        is_table_existing = False
        print("Table %s doesn't exist." % table.name)
        exit()

    finditem = a

    if not validatestring(finditem):
        exit()

    response = table.query(
        IndexName="FoodItem-index",
        KeyConditionExpression=Key('FoodItem').eq(finditem)
    )
    # If no item.
    # Format response to have only one food item and multiple drink items.
    return {
        "statusCode": 200,
        "data": response['Items']
    }

"""
This function validates a string. 
We don't want our main function to query the database using a blank food item.
If for any reason our AI model returns a blank/empty string there is no reason
to perform a lookup in the DB.
"""
def validatestring(inputstring: str) -> bool:
    # checking if string is empty (nothing entered including spaces.)
    print("Check if the input is empty : ", end="")
    if not inputstring:
        # the string is empty
        print("Invalid String food item")
        return False
    else:
        # not empty and check second condition
        # checking if string with space is empty
        if inputstring and not inputstring.isspace():
            # String valid
            return True
        else:
            # String invalid
            print("Invalid String food item")
            return False
