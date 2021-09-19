# import the json utility package since we will be working with a JSON object
import json

# import the AWS SDK (for Python the package name is boto3)
import boto3
# import two packages to help us with dates and date formatting
from time import gmtime, strftime
from botocore.exceptions import ClientError

# create a DynamoDB object using the AWS SDK

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table = dynamodb.Table('Pairings')
table2 = dynamodb.Table('Users')
# store the current time in a human readable format in a variable
now = strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())

""" This function takes a pairing that the user has created and deletes it from the database, as well as removes
 it from other users favourites 
 event {
    "UID" : "userid",
    "PID" : "pairingid"
 }"""


# define the handler function that the Lambda service will use as an entry point
def delete_pairing(event, context):
    # extract values from the event object we got from the Lambda service and store in a variable
    pid = event['PID']
    if validate_request(pid) == "false":
        return {
            'StatusCode': 400,
            'Data': "Failed to delete pairing"
        }

    try:
        # delete based on id from request
        table.delete_item(
            Key={
                'PID': pid
            }
        )
        # once pairing has been deleted from pairings database, we need to delete pairings from user favourites
        remove_favourite(pid)
        remove_user_upvoted(pid)
        remove_user_downvoted(pid)
    except ClientError as e:
        # throw error if failed
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            # return a properly formatted JSON object
            return {
                'StatusCode': 400,
                'Data': "Failed to delete pairing"
            }
        else:
            raise
    else:
        return {
            'StatusCode': 200,
            'Data': "Pairing deleted"
        }


def remove_favourite(pid):
    # this function deletes the pairing from user favourites in user table
    # here we scan the whole table and store it's json in allresponse var
    allresponse = table2.scan()
    # edit the response to only show items
    response = allresponse['Items']

    for items in response:
        # iterate through response to go through every item in user table
        uid = items["UID"]
        index = 0

        for fav in items["FavouritePairings"]:
            # iterate through the favourite pairings array
            if fav == pid:
                # when id is found then update the item by removing it.
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


def remove_user_upvoted(pid):
    # this function deletes the pairing from user upvotes in user table
    # here we scan the whole table and store it's json in allresponse var
    allresponse = table2.scan()
    # edit the response to only show items
    response = allresponse['Items']

    for items in response:
        # iterate through response to go through every item in user table
        uid = items["UID"]
        index = 0

        for fav in items["UserUpvoted"]:
            # iterate through the favourite pairings array
            if fav == pid:
                # when id is found then update the item by removing it.
                table2.update_item(
                    Key={
                        'UID': uid
                    },
                    # remove id at index of UserUpvoted list
                    UpdateExpression=f"remove UserUpvoted[{index}]",
                    ConditionExpression=f"contains(UserUpvoted, :pair)",
                    ExpressionAttributeValues={':pair': pid},
                    ReturnValues="UPDATED_NEW"
                )
            index = index + 1

    return json.dumps({'isSuccessful': 'true', 'PID': pid})


def remove_user_downvoted(pid):
    # this function deletes the pairing from user downvotes in user table
    # here we scan the whole table and store it's json in allresponse var
    allresponse = table2.scan()
    # edit the response to only show items
    response = allresponse['Items']

    for items in response:
        # iterate through response to go through every item in user table
        uid = items["UID"]
        index = 0

        for fav in items["UserDownvoted"]:
            # iterate through the favourite pairings array
            if fav == pid:
                # when id is found then update the item by removing it.
                table2.update_item(
                    Key={
                        'UID': uid
                    },
                    # remove id at index of UserDownvoted list
                    UpdateExpression=f"remove UserDownvoted[{index}]",
                    ConditionExpression=f"contains(UserDownvoted, :pair)",
                    ExpressionAttributeValues={':pair': pid},
                    ReturnValues="UPDATED_NEW"
                )
            index = index + 1

    return json.dumps({'isSuccessful': 'true', 'PID': pid})


def validate_request(pid):
    testrequest = None
    if pid == "":
        testrequest = "false"
        return testrequest
    elif isinstance(pid, str):
        testrequest = "true"
        return testrequest
    else:
        return "false"
