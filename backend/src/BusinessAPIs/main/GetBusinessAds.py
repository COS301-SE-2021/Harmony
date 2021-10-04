import json
import boto3
from botocore.exceptions import ClientError
from datetime import date, timedelta, datetime
from datetime import time
from datetime import datetime

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
business_pairings_table_name = 'BusinessPairings'
business_pairing_table = dynamodb.Table(business_pairings_table_name)


def get_business_ads(event, context):
    bid = event['BID']

    response = business_pairing_table.scan()
    business_pairings = response["Items"]

    adverts = []
    for i in business_pairings:
        date_created = datetime.strptime(i['DateCreated'], '%Y-%m-%d')
        if i["BID"] == bid:

            today = datetime.strptime(str(date.today()), '%Y-%m-%d')
            days_completed = (today - date_created).days

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
            if i['TimeLimit'] == "One Week":
                timeLimit = 7


            days_remaining = timeLimit - days_completed
            i['timeLeft'] = str(days_remaining) + " days"
            adverts.append(i)

    return {"StatusCode": 200,
            "Adverts": adverts}
