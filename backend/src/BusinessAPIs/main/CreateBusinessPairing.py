import json
import boto3
import uuid
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'BusinessPairings'
table = dynamodb.Table(table_name)

business_user_table_name = 'BusinessUsers'
business_user_table = dynamodb.Table(business_user_table_name)

"""
This function adds the business users pairing to the corresponding table.
A check needs to occur in the business user table to ensure the business is not surpassing their account limit.
If the user paid for 5 adverts they should only be able to create 5 pairings.
"""


def create_business_pairing(event, context):
    drink_desc = event['DrinkDesc']
    drink_item = event['DrinkItem']
    food_desc = event['FoodDesc']
    food_item = event['FoodItem']
    price = event['Price']
    businessID = event['BID']

    """Gets the business user data that we will need to process before they can add their pairing."""
    try:
        busines_user_data = table.get_item(Key={'BID': businessID})
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {"StatusCode": 400}

    # generate unique id for business pairing
    bpID = uuid.uuid4().hex

    # need to have an array of locations of stores.
    # Need to keep track of it because the business is limited to a specific number of locations otherwise they pay
    # more.
    #location_array = event['Location']

    # TODO: A check if the business user is not surpassing their current account limit (Checks the user table)

    # write data for new pairing to the DynamoDB table using the object we instantiated and save response in a variable
    table.put_item(
        Item={
            'BPID': bpID,
            'DrinkDesc': drink_desc,
            'DrinkItem': drink_item,
            'FoodDesc': food_desc,
            'FoodItem': food_item,
            'Price': price
        })

    return {"StatusCode": 200}
