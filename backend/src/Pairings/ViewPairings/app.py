import json
import boto3
from boto3.dynamodb.conditions import Key

client = boto3.resource('dynamodb')
table = client.Table('Pairings')


def lambda_handler(event, context):
    print("Hello Harmony")
    # add entire table to allresponse
    allresponse = table.scan()
    # edit the response to only show items
    response = allresponse['Items']
    # response = table.query(
    #     KeyConditionExpression=
    #     Key('PID').eq('p1')
    # )
    # items1 = response['Items']
    # print(items1)
    # response = table.query(
    #     KeyConditionExpression=
    #     Key('PID').eq('p2')
    # )
    # items2 = response['Items']
    # print(items2)
    # response = table.query(
    #     KeyConditionExpression=
    #     Key('PID').eq('p3')
    # )
    # items3 = response['Items']
    # print(items3)
    #
    # response = table.query(
    #     KeyConditionExpression=
    #     Key('PID').eq('p4')
    # )
    # items4 = response['Items']
    # print(items4)
    #
    # response = table.query(
    #     KeyConditionExpression=
    #     Key('PID').eq('p5')
    # )
    # items5 = response['Items']
    # print(items5)
    #

    return {
        # returns all items stored in response
        "StatusCode": 200,
        "Data": response
    }
