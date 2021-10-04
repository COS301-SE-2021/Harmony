import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
business_pairings_table_name = 'BusinessPairings'
business_pairing_table = dynamodb.Table(business_pairings_table_name)


def get_business_ads(event, context):
    bid = event['BID']

    response = business_pairing_table.scan()
    business_pairings = response["Items"]

    return {"StatusCode": 200}
