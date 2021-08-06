# import the json utility package since we will be working with a JSON object
import json

# import the AWS SDK (for Python the package name is boto3)
import boto3
# import two packages to help us with dates and date formatting
from time import gmtime, strftime
from botocore.exceptions import ClientError

# create a DynamoDB object using the AWS SDK

# dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")
dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table = dynamodb.Table('Users')
# store the current time in a human readable format in a variable
now = strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())


# define the handler function that the Lambda service will use as an entry point
def remove_from_favourites(event, context):
    # extract values from the event object we got from the Lambda service and store in a variable
    uid = event['UID']
    pid = event['PID']

    # validate request edge case
    if validate_request(pid, uid) == "false":
        return json.dumps({'isSuccessful': 'false', 'PID': pid})

    response = table.get_item(Key={'UID': uid})
    # convert number to integer
    amount = len(response['Item']['FavouritePairings'])
    index = 0
    for key in response['Item']['FavouritePairings']:
        # traverse each item in Pairings and search for id the list
        # find id the break, because index is incrementing till id is found
        if key == pid:
            break
        index = index + 1


    try:

        response = table.update_item(
            Key={
                'UID': uid
            },
            # remove id at index of FavouritePairings list
            UpdateExpression=f"remove FavouritePairings[{index}]",
            ConditionExpression=f"contains(FavouritePairings, :pair)",
            ExpressionAttributeValues={':pair': pid},
            ReturnValues="UPDATED_NEW"
        )

    except ClientError as e:
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            print(e.response['Error']['Message'])
            # fix this, return false when fixed, test edge cases
            return json.dumps({'StatusCode': 200, 'PID': pid})
        else:
            raise
    else:
        return json.dumps({'StatusCode': 200, 'PID': pid})


def validate_request(pid, uid):
    if pid == "" or uid == "":
        return "false"
    else:
        return "true"
