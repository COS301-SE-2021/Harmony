import json
import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError

# import requests

"""
This file is part of a larger implementation that needs to recognize
an image that was sent and thereafter returns pairings and information
on these pairings. 
"""

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'Pairings'
table = dynamodb.Table(table_name)

try:
    is_table_existing = table.table_status in ("CREATING", "UPDATING", "DELETING", "ACTIVE")
except ClientError:
    is_table_existing = False
    print("Table %s doesn't exist." % table.name)
    exit()


"""
findpairing will take in a string of a food type that was recognized by the AI.
It then searches the database for all the pairings that include the individual food item
and returns the pair as well as some data for the pair  
"""

# must actually take in a string variable when we combine full functionality to equate it too
def findpairing(event, context):

    print("Test")
    finditem = 'Burger'

    if not validatestring(finditem):
        exit()

    response = table.query(
        IndexName="FoodItem-index",
        KeyConditionExpression=Key('FoodItem').eq(finditem)
    )
    #If no item.
    #Format response to have only one food item and multiple drink items.
    return {"Data":response['Items']}


#TODO: Retrieving images from S3 bucket using URL in database.

def validatestring(inputstring: str) -> bool:
    # checking if string is empty (nothing entered including spaces.)
    print("Check if the input is empty : ", end="")
    if not inputstring:
        # the string is empty
        print("Invalid String food item")
        return False
    else:
        # not empty and check second condition
        # checking if string with space is empty
        if inputstring and not inputstring.isspace():
            # String valid
            return True
        else:
            # String invalid
            print("Invalid String food item")
            return False