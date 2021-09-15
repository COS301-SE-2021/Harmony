import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
business_user_table_name = 'BusinessUsers'
business_user_table = dynamodb.Table(business_user_table_name)

"""
This lambda function takes in the business users ID and the amount that is being paid.
It then adjusts their credit in the database.
"""


def receive_payment(event, context):
    amount = event['Amount']
    bid = event['BID']

    """Gets the business user data that we will need to process the payment for."""
    try:
        business_user_data = business_user_table.get_item(Key={'BID': bid})
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {"StatusCode": 400}

    return {
        "StatusCode": 200,
    }
