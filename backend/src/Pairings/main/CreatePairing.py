# import the json utility package since we will be working with a JSON object
import json
import uuid
# import the AWS SDK (for Python the package name is boto3)
import boto3
import datetime
from geopy.geocoders import Nominatim
# import two packages to help us with dates and date formatting
from time import gmtime, strftime

"""
This file implements a new pairing that will be added to the pairings database.
"""

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table = dynamodb.Table('Pairings')

# store the current time in a human readable format in a variable
now = strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())

"""
    This function adds a new pairing to the database.
    A Pid is generated for the user.
    If any input is not passed in, the system does not add the new pairing.
    :returns JSON object saying whether it was successful, as well as the generated Pid

    event{
        "UID" : "",
        "Foodid" : "",
        "Drinkid" : "",
        "Mealtagid" : "",
        "Latitude" :  xx.xxxx,
        "Longitude" : xx.xxxx
    }
    """


# define the handler function that the Lambda service will use as an entry point
def create_pairing(event, context):
    if not check_if_key_exists(event):
        return {
            "StatusCode": 400,
            "Data": "Failed to create pairing"
        }

    if not check_if_input_is_valid(event):
        return {
            "StatusCode": 400,
            "Data": "Failed to create pairing"
        }

    response = add_to_database(event)

    # return a properly formatted JSON object
    if response == False:
        return {
            "StatusCode": 400,
            "Data": "Failed to create pairing"
        }
    else:
        return {
            'StatusCode': 200,
            'Data': "Pairing created",
            'Pairing' : response
        }


def validatestring(inputstring: str) -> bool:
    """
    :param inputstring: string going through validation check
    :type inputstring: string
    :returns true/false depending whether string is valid or not
    :rtype Boolean
    """
    # checking if string is empty (nothing entered including spaces.)
    # print("Check if the input is empty : ", end="")
    if not inputstring:
        # the string is empty
        # print("Invalid String")
        return False
    else:
        # not empty and check second condition
        # checking if string with space is empty
        if inputstring and not inputstring.isspace():
            # String valid
            return True
        else:
            # String invalid
            # print("Invalid String")
            return False


def check_if_key_exists(event):
    if "UID" not in event:
        return False
    elif "Foodid" not in event:
        return False
    elif "Drinkid" not in event:
        return False
    elif "Mealtagid" not in event:
        return False
    elif "Latitude" not in event:
        return False
    elif "Longitude" not in event:
        return False
    else:
        return True


def check_if_input_is_valid(event):
    # extract values from the event object we got from the Lambda service and store in a variable
    # exits if the string is not correct.
    b = event['UID']
    if not validatestring(b):
        return False

    b = event['Foodid']
    if not validatestring(b):
        return False

    c = event['Drinkid']
    if not validatestring(c):
        return False

    d = event['Mealtagid']
    if not validatestring(d):
        return False

    return True


def add_to_database(event):
    # generate unique id for pairing
    pid = uuid.uuid4().hex

    fooddata = get_food_data(event["Foodid"])
    drinkdata = get_drink_data(event["Drinkid"])
    mealtagdata = get_meal_tag_data(event["Mealtagid"])
    datedata = get_date_data()
    locationdata = get_location_data(event)

    inputdata = {
        "Coordinates": locationdata["coordinates"],
        "DateAdded": datedata,
        "Downvotes": 0,
        "DrinkDesc": drinkdata["DrinkDescription"],
        "DrinkID": drinkdata["DrinkID"],
        "DrinkImage": drinkdata["DrinkImage"],
        "DrinkItem": drinkdata["DrinkName"],
        "DrinkTags": drinkdata["DrinkTags"],
        "FoodDesc": fooddata["FoodDescription"],
        "FoodID": fooddata["FoodID"],
        "FoodImage": fooddata["FoodImage"],
        "FoodItem": fooddata["FoodName"],
        "FoodTags": fooddata["FoodTags"],
        "Location": locationdata["address"],
        "MealTag": mealtagdata["TagName"],
        "PID": pid,
        "UID": event["UID"],
        "Upvotes": 0
    }
    # write data for new pairing to the DynamoDB table using the object we instantiated and save response in a variable
    response = table.put_item(
        Item=inputdata)

    if response["ResponseMetadata"]["HTTPStatusCode"] == 200:
        return inputdata
    else:
        return False


def get_food_data(foodid):
    foodtable = dynamodb.Table("Foods")
    response = foodtable.get_item(
        Key={'FoodID': foodid}
    )
    return response["Item"]


def get_drink_data(drinkid):
    drinktable = dynamodb.Table("Drinks")
    response = drinktable.get_item(
        Key={'DrinkID': drinkid}
    )
    return response["Item"]


def get_meal_tag_data(mealtagid):
    mealtagtable = dynamodb.Table("Mealtags")
    response = mealtagtable.get_item(
        Key={'Mealid': mealtagid}
    )
    return response["Item"]


def get_date_data():
    date = datetime.date.today()
    date = f"{date.year}" + "-" + f"{date.month}" + "-" + f"{date.day}"
    return date


def get_location_data(event):
    latitude = event["Latitude"]
    longitude = event["Longitude"]
    coordinates = [f"{latitude}", f"{longitude}"]
    geolocator = Nominatim(user_agent="GetLoc")
    location = geolocator.reverse(f"{latitude}, {longitude}")
    address = location.raw["address"]
    addressstring = ""
    if "road" in address:
        addressstring = addressstring + address["road"]

    if "suburb" in address:
        addressstring = addressstring + ", " + address["suburb"]

    if "town" in address:
        addressstring = addressstring + ", " + address["town"]

    return {
        "address": addressstring, "coordinates": coordinates
    }