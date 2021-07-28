import json
import boto3

client = boto3.resource('dynamodb')
table = client.Table('Pairings')

def filter_controversial(event, context):

    return 0
