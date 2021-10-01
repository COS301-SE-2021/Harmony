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
    return {"StatusCode": 200}
