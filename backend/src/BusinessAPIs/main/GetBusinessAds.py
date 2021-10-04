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


            tt= i["TotalTime"]
            noc = i["NumberOfClicks"]
            i["AverageTime"] = 0
            if noc != 0:
                avg = tt / noc
                i["AverageTime"] = round(avg)

                if i["TotalTime"] > 60:
                    time = i["TotalTime"]
                    time = round(time / 60)
                    i["TotalTime"] = f"{time} Minutes"
                elif i["TotalTime"] > 3600:
                    time = i["TotalTime"]
                    time = round(time / 3600)
                    i["TotalTime"] = f"{time} Hours"
                else:
                    time = i["TotalTime"]
                    i["TotalTime"] = f"{time} Seconds"

                if i["AverageTime"] > 60:
                    time = i["AverageTime"]
                    time = round(time / 60)
                    i["AverageTime"] = f"{time} Minutes"
                elif i["AverageTime"] > 3600:
                    time = i["AverageTime"]
                    time = round(time / 3600)
                    i["AverageTime"] = f"{time} Hours"
                else:
                    time = i["AverageTime"]
                    i["AverageTime"] = f"{time} Seconds"


            adverts.append(i)

    sorted_adverts = sortbynew(adverts)
    return {"StatusCode": 200,
            "Adverts": sorted_adverts}


"""
Sorts the response by date from newest to oldest.
"""


def sortbynew(response):
    # this function sorts the dateadded from new to old
    sortedresponse = sorted(response, key=lambda x: datetime.strptime(x['DateCreated'], '%Y-%m-%d'), reverse=True)
    return sortedresponse
