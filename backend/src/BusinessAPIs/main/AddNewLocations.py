import json
import boto3

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'BusinessPairings'
table = dynamodb.Table(table_name)


def add_new_locations(event, context):
    return {"StatusCode": 200}