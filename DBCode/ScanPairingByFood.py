from pprint import pprint
import boto3
from boto3.dynamodb.conditions import Key


def scanPairings(name, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

    table = dynamodb.Table('Pairings')
    scan_kwargs = {
        'FilterExpression': Key('FoodName').eq(name),  # the condition you want to scan on
        'ProjectionExpression': "#nme,#drnk, #lctn",  # the attributes you want in the result
        'ExpressionAttributeNames': {"#nme": "Name","#drnk":"Drink", "#lctn": "Location"}
        # cant directly use Name because its a reserved keyword
    }
    responseText = ""
    done = False
    start_key = None
    while not done:
        if start_key:
            scan_kwargs['ExclusiveStartKey'] = start_key
        response = table.scan(**scan_kwargs)
        responseText = responseText + str(response.get('Items', []))
        start_key = response.get('LastEvaluatedKey', None)
        done = start_key is None
    return responseText
