import json
import boto3

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

    business_users_table.update_item(
        TableName=business_users_table_name,
        Key={
            'BID': user_id
        },
        ExpressionAttributeNames={'#V': 'LocationsName'},
        ExpressionAttributeValues={':v': location_name},
        UpdateExpression='SET #V = :v',
        ReturnValues="UPDATED_NEW"

    )
    return {"StatusCode": 200}
