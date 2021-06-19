import json
import boto3
from boto3.dynamodb.conditions import Key

client = boto3.resource('dynamodb')
table = client.Table('Pairings')


def lambda_handler(event, context):
    print("Hello Harmony")
    response = table.query(
        KeyConditionExpression=
        Key('PID').eq('p1')
    )

