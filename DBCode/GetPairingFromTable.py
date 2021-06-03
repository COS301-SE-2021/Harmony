import boto3
from boto3.dynamodb.conditions import Key


# queries must include the id
def queryPairing(id, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

    table = dynamodb.Table('Pairings')
    response = table.query(
        KeyConditionExpression=Key('ID').eq(id)
    )
    return response['Items']
