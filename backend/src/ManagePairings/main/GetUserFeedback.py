import json
import boto3

table_name = 'User_Feedback'

client = boto3.resource('dynamodb')

table = client.Table(table_name)

"""
Returns the number of active general users in the system.
"""


def get_user_feedback(event, context):
    response = table.scan()
    total_users = response['Items']
    if response['ResponseMetadata']['HTTPStatusCode'] == 400:
        return {
            "StatusCode": 400,
            "Data": "No data available"
        }
    return {
        "StatusCode": 200,
        "Data": total_users
    }