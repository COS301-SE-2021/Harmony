import json
import boto3
from boto3.dynamodb.conditions import Key
from datetime import date, timedelta
from datetime import time
from datetime import datetime

table_name = 'Pairings'
User_table = 'Users'

client = boto3.resource('dynamodb')

table = client.Table(table_name)
usertable = client.Table(User_table)

"""This function will take in the UID of the user, as a json event. This function returns 
 the data in the pairings table
 event format:
 {
    "UID" : "username",
    "Location" : "coordinates",
    "Sort" : "typeOfSort",
    "MealTag" : "Tag",
    "FoodTags" : ["Tags",...,...,...],
    "DrinkTags" : ["Tags",...,...,...],
    "Distance" : "XXm"

 }"""


def sort_and_filter(event, context):
    uid = event['UID']
    userResponse = get_user_response(uid)
    # add entire table to allresponse
    allresponse = table.scan()
    # edit the response to only show items
    response = allresponse['Items']

    # check json passed in to see what sort to do for the response
    if event['Sort'] == 'New':
        sortedResponse = sortbynew()
    elif event['Sort'] == 'Best':
        sortedResponse = sortbybest(response)
    elif event['Sort'] == 'Trending':
        sortedResponse = sortbytrending(response)
    elif event['Sort'] == 'Controversial':
        sortedResponse = sortbycontroversial(response)

    sortedResponse = add_userdata(sortedResponse, userResponse)

    "Now after the response has been sorted, we will filter the sortedResponse"
    sortedResponse = filtertags(sortedResponse, event)
    return {
        # returns all items stored in response
        "StatusCode": 200,
        "Data": sortedResponse
    }


def sortbynew():
    # set the number of days we want to subract for the new filter
    td = timedelta(7)

    # get today's date
    today = date.today()

    # get the filter date by subtracting the td from today's date
    filter_date = today - td

    # retrieve the data of the filter date
    day = filter_date.day
    month = filter_date.month
    year = filter_date.year

    # build query string for formatting purposes
    if month == 10 or 11 or 12:
        query_string = str(year) + "-" + str(month) + "-" + str(day)
    else:
        query_string = str(year) + "-0" + str(month) + "-" + str(day)

    sortedresponse = table.query(
        IndexName='UID-DateAdded-index',
        KeyConditionExpression=Key('UID').eq('u9') & Key('DateAdded').gt(query_string)
    )

    return sortedresponse


def sortbycontroversial(response):
    # Sort response by total down votes votes in descending order(Controversial)
    sortedResponse = sorted(response, key=downvotes_function, reverse=True)
    return sortedResponse


def sortbybest(response):
    # Sort response by total up votes votes in descending order(Best)
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


def filtertags(sortedResponse, event):
    mealtags = event["MealTags"]
    drinktags = event["DrinkTags"]
    foodtags = event["FoodTags"]

    counter = 0
    """This for loop will remove the MealTags that aren't needed by the user"""
    for i in range(len(sortedResponse)):

        foundmeal = False
        if len(mealtags) > 0:
            for meals in mealtags:
                if meals == sortedResponse[counter]["MealTag"]:
                    foundmeal = True
            if not foundmeal:
                # when deleted the objects below will move up the list hence why counter
                # is not increased here
                del sortedResponse[counter]
            else:
                # only increment counter when not deleted
                counter = counter + 1

    counter = 0
    for i in range(len(sortedResponse)):
        founddrink = False
        for drinks in drinktags:
            for drinksinpairings in sortedResponse[counter]["DrinkTags"]:
                if drinks == drinksinpairings:
                    founddrink = True

            if not founddrink:
                del sortedResponse[counter]
                break

        if founddrink:
            counter = counter + 1

    return sortedResponse


def filterdistance(a):
    return 0


# this functions returns the json value we will want to sort by
def upvotes_function(value):
    return value["Upvotes"]


# this functions returns the json value we will want to sort by
def totalvotes_function(value):
    return value["TotalVotes"]


# this functions returns the json value we will want to sort by
def downvotes_function(value):
    return value["Downvotes"]


def get_user_response(uid):
    # return all the data from the user table for specific user
    response = usertable.get_item(
        Key={'UID': uid}
    )

    return response['Item']


def add_userdata(pairingresponse, user_response):
    """This function passes in the list of pairings as pairingresponse
    and also passes in  all the data for the user from the database as user_response.
    The function will then go through the user database and see what pairings have been
    upvoted, downvoted and favourited, then we will iterate through the pairingresponse to append
    user data"""

    # get user data as a list in the following variables
    userUpvotes = user_response['UserUpvoted']
    userDownvotes = user_response['UserDownvoted']
    userFavourites = user_response['FavouritePairings']

    for i in pairingresponse:
        # initially set user data to false in each pairing
        i['isUpvoted'] = "False"
        i['isDownvoted'] = "False"
        i['isFavourited'] = "False"
        for favs in userFavourites:
            # if user data matches pairing then add it to the response with True
            if favs == i["PID"]:
                i['isFavourited'] = "True"

        for up in userUpvotes:
            if up == i["PID"]:
                i['isUpvoted'] = "True"

        for down in userDownvotes:
            if down == i["PID"]:
                i['isDownvoted'] = "True"

    return pairingresponse
