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

payments_table_name = 'Payments'
payment_user_table = dynamodb.Table(payments_table_name)

"""
Gets the statement for the business user.
"""


def get_statement(event, context):
    bid = event['BID']

    allresponse = business_pairings_table.scan()
    response = allresponse['Items']

    statement_time_period = event['TimePeriod']
    statement_duration = 30

    """Gets the business user data using the business id"""
    try:
        business_user_data = business_user_table.get_item(Key={'BID': bid})
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {"StatusCode": 400}

    """
    Adjusts duration of statement based on the input set.
    Default is 1 Month/30 days.
    """

    if statement_time_period == "Day":
        statement_duration = 1
    elif statement_time_period == "Week":
        statement_duration = 7
    elif statement_time_period == "Month":
        statement_duration = 30
    elif statement_time_period == "Year":
        statement_duration = 365
    elif statement_time_period == "All":
        statement_duration = 1000


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

            timeLimit = 30

            if i['TimeLimit'] == "One Month":
                timeLimit = 30
            if i['TimeLimit'] == "One Day":
                timeLimit = 1
            if i['TimeLimit'] == "Three Months":
                timeLimit = 90
            if i['TimeLimit'] == "Six Months":
                timeLimit = 180
            if i['TimeLimit'] == "One Year":
                timeLimit = 365

            days_remaining = timeLimit - difference
            i['DaysRemaining'] = days_remaining
            adverts.append(i)

    all_payment_response = payment_user_table.scan()
    payment_response = all_payment_response['Items']

    for k in payment_response:
        if k['BID'] == bid:
            adverts.append(k)

    sort_response = sortbynew(adverts)

    return {
        "StatusCode": 200,
        "AdvertData": sort_response,
        "OutsandingAmount": business_user_data["Item"]["OutstandingAmount"]

    }


"""
Sorts the response by date from newest to oldest.
"""


def sortbynew(response):
    # this function sorts the dateadded from new to old
    sortedresponse = sorted(response, key=lambda x: datetime.strptime(x['DateCreated'], '%Y-%m-%d'), reverse=True)
    return sortedresponse
