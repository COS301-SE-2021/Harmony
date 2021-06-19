# import the json utility package since we will be working with a JSON object
import json
from decimal import Decimal

# import the AWS SDK (for Python the package name is boto3)
import boto3
# import two packages to help us with dates and date formatting
from time import gmtime, strftime
from botocore.exceptions import ClientError

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
# use the DynamoDB object to select our table
table = dynamodb.Table('Pairings')
# store the current time in a human readable format in a variable
now = strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())

# define the handler function that the Lambda service will use as an entry point
def lambda_handler(event, context):
# extract values from the event object we got from the Lambda service and store in a variable
    pid = event[1]

    try:
        #delete based on id from request
        response = table.delete_item(
            Key={
                'PID': pid
            }
        )
    except ClientError as e:
        #throw error if failed
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            # return a properly formatted JSON object
            return {
                'statusCode': 400,
                'body': json.dumps({'isSuccessful': 'false'})
            }
        else:
            raise
    else:
        return {
                'statusCode': 200,
                'body': json.dumps({'isSuccessful': 'true'})
            }
