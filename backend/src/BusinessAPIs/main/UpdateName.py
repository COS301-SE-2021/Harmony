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

    """Gets the business user data using the business id"""
    try:
        business_user_data = business_user_table.get_item(Key={'BID': bid})
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {"StatusCode": 400}

    return {"StatusCode": 200,
            "Data": business_user_data['Item']}
