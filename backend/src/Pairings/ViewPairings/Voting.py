import json
import boto3

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'Pairings'
table = dynamodb.Table(table_name)


def vote(event, context):
    print("Test")

    return 0
