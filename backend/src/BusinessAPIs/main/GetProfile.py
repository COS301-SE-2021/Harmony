import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'BusinessUsers'
business_user_table = dynamodb.Table(table_name)

"""
Returns the user data for the business users profile.
"""


def get_profile(event, context):

    bid = event['BID']

    """Gets the business user data using the business id"""
    try:
        business_user_data = business_user_table.get_item(Key={'BID': bid})
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {"StatusCode": 400}


    locations = []

    a = business_user_data["Item"]["Locations"]
    for i in a:
        locations.append(i["Name"])

    return {
        "StatusCode": 200,
        "UserData": business_user_data["Item"],
        "Locations": locations
    }
