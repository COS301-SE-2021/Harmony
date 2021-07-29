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

    if event['Sort'] == 'New':
        sortedResponse = sortbynew(response)
    elif event['Sort'] == 'Best':
        sortedResponse = sortbybest(response)
    elif event['Sort'] == 'Trending':
        sortedResponse = sortbytrending(response)




    return {
        # returns all items stored in response
        "StatusCode": 200,
        "Data": sortedResponse
    }





def sortbynew(response):
    return 0


def sortbycontroversial(a):
    return 0


def sortbybest(response):
    sortedResponse = sorted(response, key=upvotes_function, reverse=True)
    return sortedResponse


def sortbytrending(response):
    # iterate through response and append total votes
    for i in response:
        totalvotes = i['Upvotes'] + i['Downvotes']
        i['TotalVotes'] = totalvotes
    # Sort response by total votes in decending order(Trending)
    sortedResponse = sorted(response, key=totalvotes_function, reverse=True)
    return sortedResponse


def filtertags(a):
    return 0


def filterdistance(a):
    return 0

# this functions returns the json value we will want to sort by
def upvotes_function(value):
    return value["Upvotes"]

# this functions returns the json value we will want to sort by
def totalvotes_function(value):
    return value["TotalVotes"]


