import json
import boto3
from boto3.dynamodb.conditions import Key
from datetime import date, timedelta, datetime
from datetime import time
from datetime import datetime
import geopy
from geopy import distance
from geopy.geocoders import Nominatim

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
    "Sort" : "typeOfSort",
    "MealTags" : ["Tags",...,...,...],
    "FoodTags" : ["Tags",...,...,...],
    "DrinkTags" : ["Tags",...,...,...],
    "Distance" : xxx,
    "Longitude" : xxx,
    "Latitude" : xxx
 }"""


def view_user_pairings(event, context):
    uid = event['UID']
    userResponse = get_user_response(uid)
    # add entire table to allresponse
    allresponse = table.scan()
    # edit the response to only show items
    response = allresponse['Items']
    response = get_user_created(uid, response)
    response = add_distances(response, event['Latitude'], event['Longitude'])
    # check json passed in to see what sort to do for the response
    if event['Sort'] == 'New':
        sortedResponse = sortbynew(response)
    elif event['Sort'] == 'Best':
        sortedResponse = sortbybest(response)
    elif event['Sort'] == 'Trending':
        sortedResponse = sortbytrending(response)
    elif event['Sort'] == 'Controversial':
        sortedResponse = sortbycontroversial(response)
    elif event['Sort'] == 'Closest':
        sortedResponse = sortbydistance(response)

    sortedResponse = add_userdata(sortedResponse, userResponse)
    "Now after the response has been sorted, we will filter the sortedResponse"
    sortedResponse = filtertags(sortedResponse, event)

    range = event['Distance']
    if range is not None:
        sortedResponse = filter_by_range(sortedResponse,event['Distance'])
    return {
        # returns all items stored in response
        "StatusCode": 200,
        "Data": sortedResponse
    }


def sortbynew(response):
    # this function sorts the dateadded from new to old
    sortedresponse = sorted(response, key=lambda x: datetime.strptime(x['DateAdded'], '%Y-%m-%d'), reverse=True)
    return sortedresponse


def range_of_days(response):
    """The following function filters any paiings response within a range of 30days"""
    # this takes the current time and subtract 30 days to get a range
    d = datetime.today() - timedelta(days=30)
    # this gets rid of the time, because we only work with dates
    d = d.replace(hour=0, minute=0, second=0, microsecond=0)  # Returns a copy
    counter = 0
    # this simple for loop removes any item in the response that is out of range of 30 days
    for i in range(len(response)):
        date = datetime.strptime(response[counter]['DateAdded'], '%Y-%m-%d')
        if date >= d:
            counter = counter + 1

        else:
            del response[counter]
    # returns adjusted response with only items within time range
    return response


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
    sortedResponse = range_of_days(sortedResponse)
    return sortedResponse


def sortbydistance(response):
    # sort by distance in descending order
    sortedResponse = sorted(response, key=dist_func)
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
    """This for loop will remove the DrinkTags that aren't needed by the user"""
    for i in range(len(sortedResponse)):
        """in the double for loop below, we first iterate through the tags that the user wants
        then we iterate through the tags of each pairing, remember all tags from the user need
        to match the the drink of the pairing, so if tags not found then var:founddrink will
        stay false"""
        if len(drinktags) > 0:
            for drinks in drinktags:
                founddrink = False
                for drinksinpairings in sortedResponse[counter]["DrinkTags"]:
                    if drinks == drinksinpairings:
                        founddrink = True

                if not founddrink:
                    # when deleted the objects below will move up the list hence why counter
                    # is not increased here
                    del sortedResponse[counter]
                    # we break because once the first tag has not been found there is no need to continue
                    break

            if founddrink:
                # only increment counter when not deleted
                counter = counter + 1

    counter = 0
    """This for loop will remove the FoodTags that aren't needed by the user"""
    for i in range(len(sortedResponse)):
        """in the double for loop below, we first iterate through the tags that the user wants
        then we iterate through the tags of each pairing, remember all tags from the user need
        to match the the food of the pairing, so if tags not found then var:foundfood will
        stay false"""
        if len(foodtags) > 0:
            for foods in foodtags:
                foundfood = False
                for foodsinpairings in sortedResponse[counter]["FoodTags"]:
                    if foods == foodsinpairings:
                        foundfood = True

                if not foundfood:
                    # when deleted the objects below will move up the list hence why counter
                    # is not increased here
                    del sortedResponse[counter]
                    # we break because once the first tag has not been found there is no need to continue
                    break

            if foundfood:
                # only increment counter when not deleted
                counter = counter + 1

    return sortedResponse


# this functions returns the json value we will want to sort by
def upvotes_function(value):
    return value["Upvotes"]


# this functions returns the json value we will want to sort by
def totalvotes_function(value):
    return value["TotalVotes"]


# this functions returns the json value we will want to sort by
def downvotes_function(value):
    return value["Downvotes"]


# this functions returns the json value we will want to sort by
def dist_func(value):
    return value["Distance"]


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


def add_distances(response, latitude, longitude):
    # must be called for geolocation to work
    geoLoc = Nominatim(user_agent="GetLoc")

    for i in response:
        # calculating distance between pairs and the user
        calcdist = distance.distance((i['Coordinates'][0], i['Coordinates'][1]), (latitude, longitude)).kilometers
        i['Distance'] = round(calcdist)

    return response


def filter_by_range(response, filterdist):
    counter = 0

    # first loop ensures "Distance" is added to response
    # second loop to delete the distances greater than the filter
    for i in range(len(response)):
        # get calculated distance between pairs and the user
        calcdist = response[counter]['Distance']

        if filterdist < calcdist:
            del response[counter]
        else:
            counter = counter + 1

    return response

def get_user_created(uid,response):
    counter = 0
    print(response)
    for i in range(len(response)):
        if response[counter]["UID"] != uid:
            del response[counter]
        else:
            counter = counter + 1
    return response