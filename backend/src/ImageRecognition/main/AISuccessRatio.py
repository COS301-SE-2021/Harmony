import json
import boto3
from datetime import datetime
import uuid
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'ScannedItems'
table = dynamodb.Table(table_name)

"""
This lambda function takes in information of the item that was scanned. 
The name of the item and whether the user deems if the scan was correct or not.
A date is also generated of when the user provides this feedback.
The function then adds the data to the database.
The data will be simplified and shown to the admin in the ViewSuccessRatio function.
"""


def ai_success_ratio(event, context):
    # is_correct is a boolean, either true or false
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
