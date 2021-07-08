import json
import boto3
from boto3.dynamodb.conditions import Key

# import requests

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table = dynamodb.Table('Pairings')


# must actually take in a string variable when we combine full functionality to equate it too
def findpairing(event, context):
    print("Test")
    finditem = 'Waffles'
    response = table.query(
        IndexName="FoodItem-index",
        KeyConditionExpression=Key('FoodItem').eq(finditem)
    )
    return response['Items']
