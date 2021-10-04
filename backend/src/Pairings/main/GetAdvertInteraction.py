# import the json utility package since we will be working with a JSON object
import json
import decimal

# import the AWS SDK (for Python the package name is boto3)
import boto3

from botocore.exceptions import ClientError

# create a DynamoDB object using the AWS SDK

# dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")
dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table = dynamodb.Table('BusinessPairings')


# define the handler function that the Lambda service will use as an entry point
def add_user_clicks(event, context):
    # extract values from the event object we got from the Lambda service and store in a variable
    bpid = event['BPID']
    timeinteraction = event['Time']

    try:
        response = table.update_item(
            Key={
                'BPID': bpid
            },
            UpdateExpression = "SET #s = #s + :val",
            ExpressionAttributeNames={
                "#s": "NumberOfClicks"
            },
            ExpressionAttributeValues={
                ':val': decimal.Decimal(1)
            },
            ReturnValues="UPDATED_NEW"

        )

        timeinteraction = timeinteraction / 1000
        timeinteraction = round(timeinteraction)

        response = table.update_item(
            Key={
                'BPID': bpid
            },
            UpdateExpression="SET #s = #s + :val",
            ExpressionAttributeNames={
                "#s": "TotalTime"
            },
            ExpressionAttributeValues={
                ':val': decimal.Decimal(timeinteraction)
            },
            ReturnValues="UPDATED_NEW"

        )
        print(response)
    except ClientError as e:
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            print(e.response['Error']['Message'])
            # fix this, return false when fixed, test edge cases
            return json.dumps({'StatusCode': 400, 'BPID': bpid})
        else:
            raise
    else:
        return json.dumps({'StatusCode': 200, 'BPID': bpid})

    return json.dumps({'StatusCode': 200, 'BPID': bpid})




