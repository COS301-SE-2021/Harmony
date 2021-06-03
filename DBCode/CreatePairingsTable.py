import boto3


def createPairingsTable(dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")
        # remove endpoint to use ddb in aws endpoint is to tell local db
    table = dynamodb.Table('Pairings')
    table.delete()
    table = dynamodb.create_table(
        TableName="Pairings",
        KeySchema=[
            {
                'AttributeName': 'ID',
                'KeyType': 'HASH'  # Partition key
            },
            {
                'AttributeName': 'FoodName',
                'KeyType': 'RANGE'  # Sort key
            }
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'ID',
                'AttributeType': 'N'
            },
            {
                'AttributeName': 'FoodName',
                'AttributeType': 'S'
            },

        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 10,
            'WriteCapacityUnits': 10
        }
    )
    return table
