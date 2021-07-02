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
    validate1 = validate_event(uid, pid)
    validate2 = check_if_fav_exists(uid, pid)
    if validate1 == "false" or validate2 == "false":
        return json.dumps({'isSuccessful': 'false', 'PID': pid})

    try:
        response = table.update_item(
            Key={
                'UID': uid
            },
            UpdateExpression="SET FavouritePairings = list_append(FavouritePairings, :pair)",
            ExpressionAttributeValues={':pair': [pid]},
            ReturnValues="UPDATED_NEW"

        )
        print(response['ResponseMetadata']['HTTPStatusCode'])

    except ClientError as e:
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            print(e.response['Error']['Message'])
            # fix this, return false when fixed, test edge cases
            return json.dumps({'isSuccessful': 'false', 'PID': pid})
        else:
            raise
    else:
        return json.dumps({'isSuccessful': 'true', 'PID': pid})


def validate_event(uid, pid):
    if pid == "" or uid == "":
        return "false"
    else:
        return "true"


def check_if_fav_exists(uid, pid):
    response = table.get_item(Key={'UID': uid})
    item = response["Item"]
    pairings = item["FavouritePairings"]
    for i in pairings:
        if i == pid:
            return "false"

    return "true"
