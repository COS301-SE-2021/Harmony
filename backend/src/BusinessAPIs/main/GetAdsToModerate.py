import json
import boto3

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'RequestAdverts'
table = dynamodb.Table(table_name)

"""
Returns all the items that have been requested to be added to the advert database by a business user.
"""


def get_ads_to_moderate(event, context):
    allresponse = table.scan()
    response = allresponse['Items']

    return {
        "StatusCode": 200,
        "Data": response
    }
