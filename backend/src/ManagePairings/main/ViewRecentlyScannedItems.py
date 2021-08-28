import json
import boto3
from datetime import date, timedelta, datetime
from datetime import datetime

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'ScannedItems'
table = dynamodb.Table(table_name)


def view_recently_scanned_items(event, context):

    # add entire table to allresponse
    allresponse = table.scan()

    # this takes the current time and subtract 7 days to get a range of the scanned
    d = date.today() - timedelta(days=7)

    return 0
