import json
import boto3

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'ScannedItems'
table = dynamodb.Table(table_name)

food_name = 'Foods'
food_table = dynamodb.Table(food_name)


def get_flavours_most_used(event, context):
    return 0