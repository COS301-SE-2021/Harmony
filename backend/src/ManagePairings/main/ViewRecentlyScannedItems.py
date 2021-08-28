import json
import boto3
from datetime import date, timedelta, datetime
from datetime import datetime

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'ScannedItems'
table = dynamodb.Table(table_name)

"""
This function tallies up the amount of scans all the users have done on a given day in the past k=7 days.
The admin can use this data to populate a line graph of the amount of times items are being scanned.
"""


def view_recently_scanned_items(event, context):
    # add entire table to allresponse
    allresponse = table.scan()
    all_scanned_items = allresponse['Items']

    # initialise count to 0 for all 7 days.
    date_count_array = [0, 0, 0, 0, 0, 0, 0]

    # If we want to extend/change the days we can change the range in the for-loop as well as the relevent subtraction
    # which is found in the for loop.
    for k in range(7):

        for i in all_scanned_items:
            # this takes the current time and subtract k days to get a range of the scanned
            d = date.today() - timedelta(days=k + 1)
            if i['DateScanned'] == str(d):
                date_count_array[6 - k] = date_count_array[6 - k] + 1

    # Gets the total scans for all 7 days.
    total_scans = sum(date_count_array)

    return 0
