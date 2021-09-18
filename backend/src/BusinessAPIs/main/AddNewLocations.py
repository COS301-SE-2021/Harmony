import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'BusinessPairings'
table = dynamodb.Table(table_name)

business_users_table_name = 'BusinessUsers'
business_users_table = dynamodb.Table(business_users_table_name)

"""
This function takes in business user data related to the locations of the business.

It then adds this data to the database.
"""


def add_new_locations(event, context):
    user_id = event['BID']
    location_name = event['LocationName']
    coordinates = event['Coordinates']
    address = event['Address']

    location_to_add = {"Address": f"{address}", "Name": f"{location_name}"}
    business_users_table.update_item(
        TableName=business_users_table_name,
        Key={
            'BID': user_id
        },
        UpdateExpression="SET Locations = list_append(Locations, :locations)",
        ExpressionAttributeValues={':locations': [location_to_add]},
        ReturnValues="UPDATED_NEW"

    )

    """Gets the business user data for the response"""
    try:
        business_user_data = business_users_table.get_item(Key={'BID': user_id})
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {"StatusCode": 400}


    return {"StatusCode": 200,
            "Data": business_user_data["Item"]
            }
