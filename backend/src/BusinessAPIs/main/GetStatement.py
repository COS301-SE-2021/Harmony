import json
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key
from datetime import date, timedelta, datetime
from datetime import time
from datetime import datetime

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
request_adverts_table_name = 'RequestAdverts'
request_adverts_table = dynamodb.Table(request_adverts_table_name)

business_user_table_name = 'BusinessUsers'
business_user_table = dynamodb.Table(business_user_table_name)

"""
Gets the statement for the business user.
"""


def get_statement(event, context):
    bid = event['BID']

    allresponse = request_adverts_table.scan()
    response = allresponse['Items']

    """Gets the business user data that we will need to process for their statement."""
    try:
        business_user_data = business_user_table.get_item(Key={'BID': bid})
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {"StatusCode": 400}

    return {
        "StatusCode": 200,
        "Data": response
    }


def calculate_total_cost_ads(bid, response, time_period):
    total_cost = 0
    for i in response:
        if i['BID'] == bid:
            total_cost = total_cost + i['Cost']

    return total_cost
