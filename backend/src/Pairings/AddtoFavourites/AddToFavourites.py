# import the json utility package since we will be working with a JSON object
import json

# import the AWS SDK (for Python the package name is boto3)
import boto3

from botocore.exceptions import ClientError

# create a DynamoDB object using the AWS SDK

# dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")
dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table = dynamodb.Table('Users')



# define the handler function that the Lambda service will use as an entry point
def add_to_favourites(event, context):
    # extract values from the event object we got from the Lambda service and store in a variable
    uid = event['UID']
    pid = event['PID']


    try:
        response = table.update_item(
            Key={
                'UID': uid
            },
            UpdateExpression={"Add #fav :pair"},
            ExpressionAttributeNames={'fav': 'FavouritePairings'},
            ExpressionAttributeValues={':pair': pid},
        )
        print(response['ResponseMetadata']['HTTPStatusCode'])

    except ClientError as e:
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            print(e.response['Error']['Message'])
            # fix this, return false when fixed, test edge cases
            return json.dumps({'isSuccessful': 'true', 'PID': pid})
        else:
            raise
    else:
        return json.dumps({'isSuccessful': 'true', 'PID': pid})
