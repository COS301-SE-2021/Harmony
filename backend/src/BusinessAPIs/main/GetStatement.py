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

    statement_time_period = event['TimePeriod']
    statement_duration = 30

    """
    Adjusts duration of statement based on the input set.
    Default is 1 Month/30 days.
    """

    if statement_time_period == "One Day":
        statement_duration = 1
    elif statement_time_period == "One Month":
        statement_duration = 30
    elif statement_time_period == "Three Months":
        statement_duration = 90
    elif statement_time_period == "Six Months":
        statement_duration = 180
    elif statement_time_period == "One Year":
        statement_duration = 365


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
