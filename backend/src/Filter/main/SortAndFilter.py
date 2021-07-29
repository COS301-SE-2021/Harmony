import json
import boto3
from boto3.dynamodb.conditions import Key

table_name = 'Pairings'
User_table = 'Users'


client = boto3.resource('dynamodb')

table = client.Table(table_name)
user_table = client.Table(User_table)

"""This function will take in the UID of the user, as a json event. This function returns 
 the data in the pairings table"""


def sort_and_filter(event, context):
    # add entire table to allresponse
    allresponse = table.scan()
    # edit the response to only show items
    response = allresponse['Items']
    item1 = response[0]

    if event['sort'] == 'New':
        sortedResponse = sortbynew(response)



    return {
        # returns all items stored in response
        "StatusCode": 200,
        "Data": sortedResponse
    }


# this functions returns the json value we will want to sort by
def sortFunction(value):
    return value["Upvotes"]


def sortbynew(response):
    return 0


def sortbycontroversial(a):
    return 0


def sortbybest(a):
    return 0


def sortbytrending(a):
    return 0


def filtertags(a):
    return 0


def filterdistance(a):
    return 0
