import json
import boto3
from botocore.exceptions import ClientError

"""This function will take in the PID of the item,the type of vote:
either upvote/downvote as well as if it is being checked/unchecked.
It then adds/subtracts the vote from the relevent item and updates
the database."""
"""
event = {
    "UID" : "userid"
    "PID" : "pairingid"
    "VoteType" : "Upvotes" || "Downvotes"
    "IsChecked" : "Checked" ||"Unchecked"
}
"""

# receives ID of the pairing, whether it was upvote/downvote,
# whether it was clicked/unclicked as well as user ID
def vote(event, context):
    dynamodb = boto3.resource('dynamodb')
    # TODO: add the actual parameters to the function.

    table_name = 'Pairings'
    user_table_name = 'Users'
    table = dynamodb.Table(table_name)
    usertable = dynamodb.Table(user_table_name)

    type = event["VoteType"]  # or Down and must be passed in from frontend
    id = event["PID"] # must be passed in from frontend
    uid = event["UID"]
    vote_type = event["IsChecked"]

    """Gets the pairing that the vote was made to as well as its data."""
    try:
        pairing_data = table.get_item(Key={'PID': id})
    except ClientError as e:
        print(e.response['Error']['Message'])

    """ Extracts the number of votes from the pairing response string depending
     on the type, either: Upvotes/Downvotes"""

    current_num_votes = pairing_data['Item'][type]

    # TODO : Uncomment this once add to user database is fixed
    if not validate_user_pairing_relation(uid, type, usertable, id, vote_type):
        return {
            "StatusCode": 400,
            "Error": "Duplicate item found in User table. Unable to complete processing"
        }

    num_votes = addvote(vote_type, current_num_votes)



    """ The new value of numvotes is written back to the database"""
    table.update_item(
        TableName=table_name,
        Key={
            'PID': id
        },
        ExpressionAttributeNames={'#V': type},
        ExpressionAttributeValues={':v': num_votes},
        UpdateExpression='SET #V = :v',
        ReturnValues="UPDATED_NEW"

    )
    response = table.get_item(Key={'PID': id})
    # ADD/REMOVE the pairing from the user favourites DB still needs to be done.
    # TODO: Fix function below
    vote_userdatabase(uid ,type,usertable , id, vote_type)
    newUpvotes = response["Item"]["Upvotes"]
    newDownvotes = response["Item"]["Downvotes"]

    return {
        "StatusCode" : 200,
        "Upvotes" : newUpvotes,
        "Downvotes" : newDownvotes
    }


def addvote(vote_type, num_votes):
    if vote_type == 'Checked':
        num_votes = num_votes + 1
    else:
        if num_votes == 0:
            #Votes already 0. No need to subtract
            return num_votes
        else:
            num_votes = num_votes - 1

    return num_votes

def vote_userdatabase(uid, type, table, pid, votetype):

    response = table.get_item(Key={'UID': uid})
    if type == "Upvotes" and votetype == "Checked":
        index = 0
        lengthOfRemoved = len(response['Item']['UserDownvoted'])
        for key in response['Item']['UserDownvoted']:
            # traverse each item in Pairings and search for id the list
            # find id the break, because index is incrementing till id is found
            if key == pid:
                break
            index = index + 1
        response = table.update_item(
            Key={
                'UID': uid
            },
            UpdateExpression="SET UserUpvoted = list_append(UserUpvoted, :pair)",
            ExpressionAttributeValues={':pair': [pid]},
            ReturnValues="UPDATED_NEW"

        )
        if index < lengthOfRemoved:
            try:
                table.update_item(
                    Key={
                        'UID': uid
                    },
                    # remove id at index of UserDownvoted list
                    UpdateExpression=f"remove UserDownvoted[{index}]",
                    ConditionExpression=f"contains(UserDownvoted, :pair)",
                    ExpressionAttributeValues={':pair': pid},
                    ReturnValues="UPDATED_NEW"
                )
            except ClientError as e:
                if e.response['Error']['Code'] == "ConditionalCheckFailedException":
                    print(e.response['Error']['Message'])
                    return
                else:
                    raise
        return
    elif type == "Downvotes" and votetype == "Checked":
        index = 0
        lengthOfRemoved = len(response['Item']['UserUpvoted'])
        for key in response['Item']['UserUpvoted']:
            # traverse each item in Pairings and search for id the list
            # find id the break, because index is incrementing till id is found
            if key == pid:
                break
            index = index + 1
        response = table.update_item(
            Key={
                'UID': uid
            },
            UpdateExpression=f"SET UserDownvoted = list_append(UserDownvoted, :pair)",
            ExpressionAttributeValues={':pair': [pid]},
            ReturnValues="UPDATED_NEW",
        )
        if index < lengthOfRemoved:
            try:
                table.update_item(
                    Key={
                        'UID': uid
                    },
                    # remove id at index of UserUpvoted list
                    UpdateExpression=f"remove UserUpvoted[{index}]",
                    ConditionExpression=f"contains(UserUpvoted, :pair)",
                    ExpressionAttributeValues={':pair': pid},
                    ReturnValues="UPDATED_NEW"
                )
            except ClientError as e:
                if e.response['Error']['Code'] == "ConditionalCheckFailedException":
                    print(e.response['Error']['Message'])
                    return
                else:
                    raise
        return
    elif type == "Upvotes" and votetype == "Unchecked":
        index = 0
        lengthOfRemoved = len(response['Item']['UserUpvoted'])
        for key in response['Item']['UserUpvoted']:
            # traverse each item in Pairings and search for id the list
            # find id the break, because index is incrementing till id is found
            if key == pid:
                break
            index = index + 1
        if index < lengthOfRemoved:
            try:
                table.update_item(
                    Key={
                        'UID': uid
                    },
                    # remove id at index of UserUpvoted list
                    UpdateExpression=f"remove UserUpvoted[{index}]",
                    ConditionExpression=f"contains(UserUpvoted, :pair)",
                    ExpressionAttributeValues={':pair': pid},
                    ReturnValues="UPDATED_NEW"
                )
            except ClientError as e:
                if e.response['Error']['Code'] == "ConditionalCheckFailedException":
                    print(e.response['Error']['Message'])
                    return
                else:
                    raise
        return
    elif type == "Downvotes" and votetype == "Unchecked":
        index = 0
        lengthOfRemoved = len(response['Item']['UserDownvoted'])
        for key in response['Item']['UserDownvoted']:
            # traverse each item in Pairings and search for id the list
            # find id the break, because index is incrementing till id is found
            if key == pid:
                break
            index = index + 1
        if index < lengthOfRemoved:
            try:

                table.update_item(
                    Key={
                        'UID': uid
                    },
                    # remove id at index of UserDownvoted list
                    UpdateExpression=f"remove UserDownvoted[{index}]",
                    ConditionExpression=f"contains(UserDownvoted, :pair)",
                    ExpressionAttributeValues={':pair': pid},
                    ReturnValues="UPDATED_NEW"
                )
            except ClientError as e:
                if e.response['Error']['Code'] == "ConditionalCheckFailedException":
                    print(e.response['Error']['Message'])
                    return
                else:
                    raise
        return

    return

"""
    This function validates the user-pairing relation.
    There are 4 voting scenarios a user can take part in and all cases need to ensure that
    that when they are occur they keep the integrity of the user-pairing relation.
    No duplicate pairings should be in a users row.
    When a user 'Unchecks' a vote we need to ensure that they actually have voted
    before to keep the integrity of the voting system.
"""

def validate_user_pairing_relation(uid, type, table, pid, votetype):
    response = table.get_item(Key={'UID': uid})

    if type == "Upvotes" and votetype == "Checked":

        for key in response['Item']['UserUpvoted']:
            # traverse each item in Pairings and search for id the list
            if key == pid:
                return False

    elif type == "Downvotes" and votetype == "Checked":

        for key in response['Item']['UserDownvoted']:
            # traverse each item in Pairings and search for id the list
            if key == pid:
                return False

    elif type == "Upvotes" and votetype == "Unchecked":
        for key in response['Item']['UserUpvoted']:
            # traverse each item in Pairings and search for id the list
            if key == pid:
                return True
        return False

    elif type == "Downvotes" and votetype == "Unchecked":
        for key in response['Item']['UserDownvoted']:
            # traverse each item in Pairings and search for id the list
            if key == pid:
                return True
        return False
    return True