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
    location_id = event['Location_ID']
    location_name = event['Location_name']

    """try:
        business_users_table.delete_item(Key={'RID': i['RID']})
    except ClientError as e:
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            print(e.response['Error']['Message'])

            return {"StatusCode": 400}"""

    """Gets the business user data using the business id"""
    try:
        business_user_data = business_users_table.get_item(Key={'BID': bid})
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {"StatusCode": 400}

    return {"StatusCode": 200}
