import json
import boto3

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'BusinessUsers'
table = dynamodb.Table(table_name)

"""
Returns the user data for the business users profile.
"""


def get_profile(event, context):
    return {
        "StatusCode": 200,
    }
