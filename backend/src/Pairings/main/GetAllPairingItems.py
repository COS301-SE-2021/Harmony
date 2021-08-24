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
    # foodresponse = {"Foods" : get_all_foods()}
    # drinkresponse = {"Drinks" : get_all_drinks()}
    # mealtagresponse = {"MealTags" : get_all_mealtags()}
    response = {
        "StatusCode" : 200,
        "Foods" : get_all_foods(),
        "Drinks" : get_all_drinks(),
        "MealTags" : get_all_mealtags()
    }
    return response


def get_all_foods():
    response = foodtable.scan()
    response = response["Items"]
    response = sorted(response, key=lambda k: k['FoodName'])
    return response


def get_all_drinks():
    response = drinktable.scan()
    response = response["Items"]
    response = sorted(response, key=lambda k: k['DrinkName'])
    return response


def get_all_mealtags():
    response = mealtagtable.scan()
    response = response["Items"]
    response = sorted(response, key=lambda k: k['TagName'])
    return response