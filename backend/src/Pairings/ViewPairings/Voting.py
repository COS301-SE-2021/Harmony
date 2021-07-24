import json
import boto3
from botocore.exceptions import ClientError


# receives ID of the pairing, whether it was upvote/downvote,
# whether it was clicked/unclicked.
def vote(event, context):
    dynamodb = boto3.resource('dynamodb')

    # use the DynamoDB object to select our table
    table_name = 'Pairings'
    table = dynamodb.Table(table_name)

    print("Test the code")

    type = 'Upvotes'  # or Down and must be passed in from frontend
    id = '60dyrtjoucir6556'  # must be passed in from frontend
    vote_type = 'Checked'

    # gets the pairing that the vote was made to as well as its data.
    try:
        pairing_data = table.get_item(Key={'PID': id})
        print(pairing_data)
    except ClientError as e:
        print(e.response['Error']['Message'])

    # extracts the number of votes from the pairing response string depending
    # on the type, either: Upvotes/Downvotes
    num_votes = pairing_data['Item'][type]
    print(num_votes)

    if vote_type == 'Checked':
        num_votes = num_votes + 1
    else:
        num_votes = num_votes - 1

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

    # write numvotes back to table

    return response
