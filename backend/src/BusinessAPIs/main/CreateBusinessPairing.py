import json
import boto3
import uuid

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'BusinessPairings'
table = dynamodb.Table(table_name)


def create_business_pairing(event, context):
    drink_desc = event['DrinkDesc']
    drink_item = event['DrinkItem']
    food_desc = event['FoodDesc']
    food_item = event['FoodItem']
    price = event['Price']

    # generate unique id for business pairing
    bpID = uuid.uuid4().hex

    # need to have an array of locations of stores.
    # Need to keep track of it because the business is limited to a specific number of locations otherwise they pay
    # more.
    location_array = event['Location']

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
