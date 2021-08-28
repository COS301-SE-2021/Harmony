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
    all_scanned_items = allresponse['Items']

    date_count_array = [0, 0, 0, 0, 0, 0, 0]
    for k in range(7):

        for i in all_scanned_items:
            # this takes the current time and subtract k days to get a range of the scanned
            d = date.today() - timedelta(days=k + 1)
            print(i['DateScanned'])
            if i['DateScanned'] == str(d):
                date_count_array[6 - k] = date_count_array[6 - k] + 1
                
    return 0
