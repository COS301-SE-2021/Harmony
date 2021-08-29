import json
import boto3

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'ScannedItems'
table = dynamodb.Table(table_name)


def get_locations_most_used(event, context):
    return 0
