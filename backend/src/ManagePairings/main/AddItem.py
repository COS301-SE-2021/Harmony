import json
import boto3

table_name = 'Foods'

client = boto3.resource('dynamodb')

table = client.Table(table_name)

"""
Adds an item to the database via the admin webpage.

"""


def add_item(event, context):

    name = event['ItemName']
    description = event['ItemDescription']
    tags = event['ItemTags']
    image = event['ItemImage']
    id = event['ID']

    # write data for new item to the DynamoDB table
    table.put_item(
        Item={
            'FoodID': id,
            'FoodTags': tags,
            'FoodDescription': description,
            'FoodItem': name,
            'FoodImage': image
        })
    return json.dumps({'StatusCode': 200})
