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
def lambda_handler(event, context):
    # extract values from the event object we got from the Lambda service and store in a variable
    uid = event['UID']

    # store item from table in a response
    response = table.get_item(Key={'UID': uid})
    print(json.dumps(response['Item']['FavouritePairings']))
    return {
            # parse the response as a json with the correct item attributes
            'Data': json.dumps(response['Item']['FavouritePairings'])
        }
