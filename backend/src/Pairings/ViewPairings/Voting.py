import json
import boto3
from botocore.exceptions import ClientError

"""This function will take in the PID of the item,the type of vote:
either upvote/downvote as well as if it is being checked/unchecked.
It then adds/subtracts the vote from the relevent item and updates
the database."""


# receives ID of the pairing, whether it was upvote/downvote,
# whether it was clicked/unclicked as well as user ID
def vote(event, context):
    dynamodb = boto3.resource('dynamodb')
    # TODO: add the actual parameters to the function.

    table_name = 'Pairings'
    table = dynamodb.Table(table_name)

    print("Test the code")

    type = 'Upvotes'  # or Down and must be passed in from frontend
    id = 'p1'  # must be passed in from frontend
    vote_type = 'Checked'

    """Gets the pairing that the vote was made to as well as its data."""
    try:
        pairing_data = table.get_item(Key={'PID': id})
        print(pairing_data)
    except ClientError as e:
        print(e.response['Error']['Message'])

    """ Extracts the number of votes from the pairing response string depending
     on the type, either: Upvotes/Downvotes"""

    current_num_votes = pairing_data['Item'][type]
    print(current_num_votes)

    num_votes = addvote(vote_type, current_num_votes)

    """ The new value of numvotes is written back to the database"""
    response = table.update_item(
        TableName=table_name,
        Key={
            'PID': id
        },
        ExpressionAttributeNames={'#V': type},
        ExpressionAttributeValues={':v': num_votes},
        UpdateExpression='SET #V = :v',
        ReturnValues="UPDATED_NEW"

    )
    # ADD/REMOVE the pairing from the user favourites DB still needs to be done.

    return response


def addvote(vote_type, num_votes):
    if vote_type == 'Checked':
        num_votes = num_votes + 1
    else:
        if num_votes == 0:
            print("Num votes already 0. Debug")
            exit()
        else:
            num_votes = num_votes - 1

    return num_votes
