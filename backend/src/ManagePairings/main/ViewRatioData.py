import json
import boto3
from datetime import date
import uuid
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'ScannedItems'
table = dynamodb.Table(table_name)

"""

"""


def view_ratio_data(event, context):
    response = table.scan()
    itemresponse = response['Items']

    totalScanned = response['Count']

    true_count = 0
    false_count = 0
    for i in itemresponse:
        if i['CorrectlyIdentified'] == True:
            true_count = true_count + 1
        else:
            false_count = false_count + 1

    calc_ratio = true_count/false_count
    print(calc_ratio)
    print(totalScanned)
    return 0
