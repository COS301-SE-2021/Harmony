import json
import boto3

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'RequestAdverts'
table = dynamodb.Table(table_name)

"""
Gets the statement for the business user.
"""


def get_statement(event, context):
    allresponse = table.scan()
    response = allresponse['Items']

    return {
        "StatusCode": 200,
        "Data": response
    }