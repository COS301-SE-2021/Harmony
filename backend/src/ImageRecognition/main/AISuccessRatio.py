import json
import boto3
from datetime import datetime
import uuid
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'ScannedItems'
table = dynamodb.Table(table_name)


def ai_success_ratio(event, context):
    #is_correct is a boolean, either true or false
    is_correct = event['isCorrect']
    food_item = event['FoodItem']
    date = datetime.today()

    sid = uuid.uuid4().hex
    try:
        table.put_item(
            Item={
                'SID': sid,
                'FoodName': food_item,
                'DateScanned': date,
                'CorrectlyIdentified': is_correct
            })
        return json.dumps({'StatusCode': 200})

    except ClientError as e:
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            print(e.response['Error']['Message'])

            return json.dumps({'StatusCode': 400})
