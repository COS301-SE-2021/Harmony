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
table = dynamodb.Table('Pairings')
table2 = dynamodb.Table('Users')
# store the current time in a human readable format in a variable
now = strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())


# define the handler function that the Lambda service will use as an entry point
def delete_pairing(event, context):
    # extract values from the event object we got from the Lambda service and store in a variable
    pid = event['PID']

    try:
        # delete based on id from request
        response = table.delete_item(
            Key={
                'PID': pid
            }
        )
        # once pairing has been deleted from pairings database, we need to delete pairings from user favourites
        remove_favourite(pid)



    except ClientError as e:
        # throw error if failed
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            # return a properly formatted JSON object
            return {
                'statusCode': 400,
                'body': json.dumps({'isSuccessful': 'false', 'PID': pid})
            }
        else:
            raise
    else:
        return {
            'statusCode': 200,
            'body': json.dumps({'isSuccessful': 'true', 'PID': pid})
        }


def remove_favourite(pid):
    allresponse = table2.scan()
    # edit the response to only show items
    response = allresponse['Items']

    for items in response:
        print(items["UID"])
        uid = items["UID"]
        index = 0

        for fav in items["FavouritePairings"]:
            if fav == pid:
                table2.update_item(
                    Key={
                        'UID': uid
                    },
                    # remove id at index of FavouritePairings list
                    UpdateExpression=f"remove FavouritePairings[{index}]",
                    ConditionExpression=f"contains(FavouritePairings, :pair)",
                    ExpressionAttributeValues={':pair': pid},
                    ReturnValues="UPDATED_NEW"
                )
            index = index + 1

    return json.dumps({'isSuccessful': 'true', 'PID': pid})
