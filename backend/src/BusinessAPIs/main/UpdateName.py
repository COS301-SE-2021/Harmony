import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
business_user_table_name = 'BusinessUsers'
business_user_table = dynamodb.Table(business_user_table_name)


def update_name(event, context):
    new_name = event['Name']
    bid = event['BID']

    """
    Writes the new business name to the business users table.
    """
    business_user_table.update_item(
        TableName=business_user_table_name,
        Key={
            'BID': bid
        },
        ExpressionAttributeNames={'#V': 'BusinessName'},
        ExpressionAttributeValues={':v': new_name},
        UpdateExpression='SET #V = :v',
        ReturnValues="UPDATED_NEW"

    )

    return {"StatusCode": 200}
