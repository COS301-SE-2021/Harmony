import json
import boto3

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'User_Feedback'
table = dynamodb.Table(table_name)

"""
This function takes the data that is stored in the database of the correctly and
incorrectly identified items as given by a general user and calculates a ratio of correct vs incorrect for 
an admin user to view.
"""


def view_ratio_data(event, context):
    response = table.scan()
    itemresponse = response['Items']

    totalScanned = response['Count']

    true_count = 0
    false_count = 0

    for i in itemresponse:

        if i['CorrectlyIdentified'] == "True":
            true_count = true_count + 1
        else:
            false_count = false_count + 1

    calc_ratio = true_count / false_count

    return {
        "StatusCode": 200,
        "TotalScans": totalScanned,
        "GlobalRatio": calc_ratio,
        "FalseScans": false_count,
        "TrueScans": true_count
    }
