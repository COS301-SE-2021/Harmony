import json
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key
from datetime import date, timedelta, datetime
from datetime import time
from datetime import datetime

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
business_pairings_table_name = 'BusinessPairings'
business_pairings_table = dynamodb.Table(business_pairings_table_name)

business_user_table_name = 'BusinessUsers'
business_user_table = dynamodb.Table(business_user_table_name)

"""
Gets the statement for the business user.
"""


def get_statement(event, context):
    bid = event['BID']

    allresponse = business_pairings_table.scan()
    response = allresponse['Items']

    statement_duration = event['Days']

    """Gets the business user data that we will need to process for their statement."""
    try:
        business_user_data = business_user_table.get_item(Key={'BID': bid})
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {"StatusCode": 400}

    adverts = []
    for i in response:
        if i['BID'] == bid:
            adverts.append(i)

    sort_response = sortbynew(adverts)

    return {
        "StatusCode": 200,
        "Data": sort_response

    }


def calculate_total_cost_ads(bid, response, time_period):
    total_cost = 0
    for i in response:
        if i['BID'] == bid:
            total_cost = total_cost + i['Cost']

    return total_cost


"""
Sorts the response by date from newest to oldest.
"""


def sortbynew(response):
    # this function sorts the dateadded from new to old
    sortedresponse = sorted(response, key=lambda x: datetime.strptime(x['DateCreated'], '%Y-%m-%d'), reverse=True)
    return sortedresponse
