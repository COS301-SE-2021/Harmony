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
    finditem = 'Waffles'

    response = table.query(
        IndexName="FoodItem-index",
        KeyConditionExpression=Key('FoodItem').eq(finditem)
    )
    return response['Items']

#TODO: Validation of input string for the name of the item.
#TODO: Validation to check if database exists.
#TODO: Retrieving images from S3 bucket using URL in database.

