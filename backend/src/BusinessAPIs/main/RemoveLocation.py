import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'BusinessPairings'
table = dynamodb.Table(table_name)

business_users_table_name = 'BusinessUsers'
business_users_table = dynamodb.Table(business_users_table_name)


def remove_location(event, context):
    bid = event['BID']
    location_id = event['LocationID']
    location_name = event['LocationName']

    """Gets the business user data using the business id"""
    try:
        business_user_data = business_users_table.get_item(Key={'BID': bid})
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {"StatusCode": 400}

    count = 0
    for i in business_user_data["Item"]["Locations"]:
        count = count + 1
        if i["Name"] == "Durban":
            print("------------")
            del i

    """
    Write the updated locations to the table
    """

    """business_users_table.update_item(
        TableName=business_users_table_name,
        Key={
            'BID': user_id
        },
        UpdateExpression="SET Locations = list_append(Locations, :locations)",
        ExpressionAttributeValues={':locations': [location_to_add]},
        ReturnValues="UPDATED_NEW"

    )"""

    print(business_user_data["Item"]["Locations"])

    print(count)

    return {"StatusCode": 200}
