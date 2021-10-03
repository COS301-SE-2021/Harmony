import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'BusinessUsers'
business_user_table = dynamodb.Table(table_name)


def update_name(event, context):
    new_name = event['Name']

    return {"StatusCode": 200}
