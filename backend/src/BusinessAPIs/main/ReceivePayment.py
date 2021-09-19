import json
import boto3
from botocore.exceptions import ClientError
import uuid
from datetime import date, timedelta, datetime
from datetime import time
from datetime import datetime

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
business_user_table_name = 'BusinessUsers'
business_user_table = dynamodb.Table(business_user_table_name)

payments_table_name = 'Payments'
payment_user_table = dynamodb.Table(payments_table_name)

"""
This lambda function takes in the business users ID and the amount that is being paid.
It then adjusts their credit in the database.
"""


def receive_payment(event, context):
    amount_paid = event['Amount']
    bid = event['BID']

    """Gets the business user data that we will need to process the payment for."""
    try:
        business_user_data = business_user_table.get_item(Key={'BID': bid})
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {"StatusCode": 400}

    """
    Takes the current outstanding amount and subtracts the amount paid from it.
    """
    outstanding_amount = business_user_data["Item"]["OutstandingAmount"]
    new_amount = outstanding_amount - amount_paid

    """
    Writes the new outstanding amount to the business users table.
    """
    business_user_table.update_item(
        TableName=business_user_table_name,
        Key={
            'BID': bid
        },
        ExpressionAttributeNames={'#V': 'OutstandingAmount'},
        ExpressionAttributeValues={':v': new_amount},
        UpdateExpression='SET #V = :v',
        ReturnValues="UPDATED_NEW"

    )

    status_type = "Payment"
    pid = uuid.uuid4().hex
    # write data for new payment to the DynamoDB table.
    payment_user_table.put_item(
        Item={
            'PID': pid,
            'BID': bid,
            'DateCreated': str(date.today()),
            'Locations': [],
            'FoodName': "Payment Successful",
            'Price': amount_paid,
            'Status': status_type,
            'DaysRemaining': ""
        })

    """Gets the business user data that we will now use for the response."""
    try:
        data = business_user_table.get_item(Key={'BID': bid})
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {"StatusCode": 400}

    return {
        "StatusCode": 200,
        "Message": "Payment was successful",
        "Data": data["Item"]

    }
