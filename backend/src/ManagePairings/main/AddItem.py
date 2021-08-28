import json
import boto3
import uuid
from botocore.exceptions import ClientError

table_name = 'Foods'

client = boto3.resource('dynamodb')

table = client.Table(table_name)

"""
Adds an item to the database via the admin webpage.

"""


def add_item(event, context):

    name = event['ItemName']
    description = event['ItemDescription']
    tags = event['ItemTags']
    image = event['ItemImage']
    generate_id = uuid.uuid4().hex

    # write data for new item to the DynamoDB table
    try:
        table.put_item(
            Item={
                'FoodID': generate_id,
                'FoodTags': tags,
                'FoodDescription': description,
                'FoodName': name,
                'FoodImage': image
            })
        return json.dumps({'StatusCode': 200})

    except ClientError as e:
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            print(e.response['Error']['Message'])

            return json.dumps({'StatusCode': 400})
