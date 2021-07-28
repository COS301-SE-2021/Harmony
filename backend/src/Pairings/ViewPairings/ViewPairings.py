import json
import boto3
from boto3.dynamodb.conditions import Key

client = boto3.resource('dynamodb')
table = client.Table('Pairings')
usertable = client.Table('Users')
"""This function will take in the UID of the user, as a json event. This function returns 
 the data in the pairings table, sorted by Total votes."""


def View_Pairings(event, context):
    uid = event['UID']
    userResponse = get_user_response(uid)

    # add entire table to allresponse
    allresponse = table.scan()
    # edit the response to only show items
    response = allresponse['Items']

    userUpvotes = userResponse['UserUpvoted']
    userDownvotes = userResponse['UserDownvoted']
    userFavourites = userResponse['FavouritePairings']

    response = add_userdata(response, userFavourites, userUpvotes, userDownvotes)
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


def get_user_response(uid):
    response = usertable.get_item(
        Key={'UID': uid}
    )

    return response['Item']


def add_userdata(response, userFavourites, userUpvotes, userDownvotes):
    for i in response:
        for favs in userFavourites:
            if favs == i["PID"]:
                print(favs)
    return response
