import json
import boto3
from botocore.exceptions import ClientError

requestTable_name = 'RequestItems'

dynamodb = boto3.resource('dynamodb')

request_table = dynamodb.Table(requestTable_name)

"""
Removes an item from the database via the admin webpage.
"""


def remove_requested_item(event, context):
    name = event['ItemName']

    input_response = request_table.scan()
    requested_items = input_response['Items']

    # Checks if the item is in the Request table.
    # If it is then delete the item.
    # If not do not delete.

    for i in requested_items:
        if i['FoodName'] == name:
            try:
                request_table.delete_item(Key={'RID': i['RID']})
            except ClientError as e:
                if e.response['Error']['Code'] == "ConditionalCheckFailedException":
                    print(e.response['Error']['Message'])

                    return {"StatusCode": 400}
            break


