import json
import boto3

table_name = 'RequestItems'

client = boto3.resource('dynamodb')

table = client.Table(table_name)

"""
Returns all the items that have been requested to be added to the database.
"""


def view_requested_items(event, context):
    allresponse = table.scan()
    response = allresponse['Items']

    return {
        "StatusCode": 200,
        "Data": response
    }
