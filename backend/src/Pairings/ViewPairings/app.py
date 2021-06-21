import json
import boto3
from boto3.dynamodb.conditions import Key

client = boto3.resource('dynamodb')
table = client.Table('Pairings')


def lambda_handler(event, context):
    print("Hello Harmony")
    # add entire table to allresponse
    allresponse = table.scan()
    # edit the response to only show items
    response = allresponse['Items']


    return {
        # returns all items stored in response
        "StatusCode": 200,
        "Data": response
    }
