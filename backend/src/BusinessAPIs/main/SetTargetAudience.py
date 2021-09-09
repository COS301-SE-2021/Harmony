import json
import boto3

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'BusinessPairings'
table = dynamodb.Table(table_name)


def set_target_audience(event, context):

    target_audience = event['TargetAudience']
    bid = event['BID']
    bpid = event['BPID']

    #TODO: Write data to the relevent pairing table to update it with the target audience.
    return 0
