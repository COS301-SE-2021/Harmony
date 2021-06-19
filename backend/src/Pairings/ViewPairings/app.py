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
    items1 = response['Items']
    print(items1)
    response = table.query(
        KeyConditionExpression=
        Key('PID').eq('p2')
    )
    items2 = response['Items']
    print(items2)
    response = table.query(
        KeyConditionExpression=
        Key('PID').eq('p3')
    )
    items3 = response['Items']
    print(items3)
