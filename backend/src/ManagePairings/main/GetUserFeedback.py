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
    return {
        "StatusCode": 200,
        "Data": total_users
    }