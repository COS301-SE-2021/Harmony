import json
import boto3
from boto3.dynamodb.conditions import Key

client = boto3.resource('dynamodb')
table = client.Table('Pairings')

"""This function will take in the UID of the user, as a json event. This function returns 
 the data in the pairings table"""


def sort_and_filter(event, context):
    # add entire table to allresponse
    allresponse = table.scan()
    # edit the response to only show items
    response = allresponse['Items']
    item1 = response[0]


    sortedResponse = sorted(response, key=sortFunction, reverse=True)
    return {
        # returns all items stored in response
        "StatusCode": 200,
        "Data": sortedResponse
    }


# this functions returns the json value we will want to sort by
def sortFunction(value):
    return value["Upvotes"]