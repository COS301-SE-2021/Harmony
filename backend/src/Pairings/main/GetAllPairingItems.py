import json
import boto3
from boto3.dynamodb.conditions import Key

client = boto3.resource('dynamodb')
foodtable = client.Table('Foods')
drinktable = client.Table('Drinks')
mealtagtable = client.Table('Mealtags')
"""This function will take be a get request, this function will return all the food items, drink items, and 
meal tags from the dynamodb"""


def get_all_items(event, context):
    # package the response
    response = {
        "StatusCode": 200,
        "Foods": get_all_foods(),
        "Drinks": get_all_drinks(),
        "MealTags": get_all_mealtags()
    }
    return response


def get_all_foods():
    """This function gets all data from the Food database and sorts it alphabetically before returning"""
    response = foodtable.scan()
    # Filter out the items
    response = response["Items"]
    # Sort in alphabetical order according to key
    response = sorted(response, key=lambda k: k['FoodName'])
    return response


def get_all_drinks():
    """This function gets all data from the Drinks database and sorts it alphabetically before returning"""
    response = drinktable.scan()
    # Filter out the items
    response = response["Items"]
    # Sort in alphabetical order according to key
    response = sorted(response, key=lambda k: k['DrinkName'])
    return response


def get_all_mealtags():
    """This function gets all data from the Mealtag database and sorts it alphabetically before returning"""
    response = mealtagtable.scan()
    # Filter out the items
    response = response["Items"]
    # Sort in alphabetical order according to key
    response = sorted(response, key=lambda k: k['TagName'])
    return response
