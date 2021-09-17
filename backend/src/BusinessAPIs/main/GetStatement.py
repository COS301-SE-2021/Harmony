import json
import boto3
from botocore.exceptions import ClientError
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

    # this takes the current time and subtracts the input statement number of days to get a range
    d = datetime.today() - timedelta(days=statement_duration)

    # format the date to be compared
    d = d.replace(hour=0, minute=0, second=0, microsecond=0)

    adverts = []
    for i in response:
        # datetime.strptime(response[counter]['DateAdded'], '%Y-%m-%d')
        date_created = datetime.strptime(i['DateCreated'], '%Y-%m-%d')
        if i['BID'] == bid and d <= date_created:
            today = datetime.strptime(str(date.today()), '%Y-%m-%d')
            difference = (today - date_created).days
            days_remaining = i['TimeLimit'] - difference
            i['DaysRemaining'] = days_remaining
            adverts.append(i)

    sort_response = sortbynew(adverts)
    total_cost = calculate_total_cost_ads(adverts)

    return {
        "StatusCode": 200,
        "AdvertData": sort_response,
        "TotalCost": total_cost

    }


def calculate_total_cost_ads(response):
    total_cost = 0
    for i in response:
        total_cost = total_cost + i['Price']

    return total_cost


"""
Sorts the response by date from newest to oldest.
"""


def sortbynew(response):
    # this function sorts the dateadded from new to old
    sortedresponse = sorted(response, key=lambda x: datetime.strptime(x['DateCreated'], '%Y-%m-%d'), reverse=True)
    return sortedresponse
