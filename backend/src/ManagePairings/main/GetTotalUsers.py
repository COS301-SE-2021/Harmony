import json
import boto3

table_name = 'Users'

client = boto3.resource('dynamodb')

table = client.Table(table_name)

"""
Returns the number of active general users in the system.
"""


def get_total_users(event, context):
    response = table.scan()
    total_users = response['Count']
    return {
        "StatusCode": 200,
        "TotalUsers": total_users
    }