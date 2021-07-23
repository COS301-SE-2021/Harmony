import json
import boto3


# receives ID of the pairing
def vote(event, context):
    dynamodb = boto3.resource('dynamodb')

    # use the DynamoDB object to select our table
    table_name = 'Pairings'
    table = dynamodb.Table(table_name)

    print("Test the code")
    type = 'Upvotes'  # or Down and must be passed in
    id = '60dyrtjoucir6556'

    # response = table.get_item(Key={'PID': id})
    numvotes = 6  # get from DB using ID of pairing based on whether its up or down
    if type == 'Upvotes':
        numvotes = numvotes + 1  # increment

    response = table.update_item(
        TableName=table_name,
        Key={
            'PID': id
        },
        ExpressionAttributeNames={'#V': type},
        ExpressionAttributeValues={':v': numvotes},
        UpdateExpression='SET #V = :v',
        ReturnValues="UPDATED_NEW"

    )

    # write numvotes back to table

    return response
