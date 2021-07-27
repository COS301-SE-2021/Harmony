import json
import boto3
from boto3.dynamodb.conditions import Key

client = boto3.resource('dynamodb')
table = client.Table('Pairings')

"""This function will take in the UID of the user, as a json event. This function returns 
 the data in the pairings table, sorted by Total votes."""


def View_Pairings(event, context):
    # add entire table to allresponse
    allresponse = table.scan()
    # edit the response to only show items
    response = allresponse['Items']
    item1 = response[0]
    # iterate through response and append total votes
    for i in response:
        totalvotes = i['Upvotes'] + i['Downvotes']
        i['TotalVotes'] = totalvotes
    # Sort response by total votes in decending order(Trending)

    sortedResponse = sorted(response, key=sortFunction, reverse=True)
    return {
        # returns all items stored in response
        "StatusCode": 200,
        "Data": sortedResponse
    }


# this functions returns the json value we will ant to sort by
def sortFunction(value):
    return value["TotalVotes"]
