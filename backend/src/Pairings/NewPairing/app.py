# import the json utility package since we will be working with a JSON object
import json

# import the AWS SDK (for Python the package name is boto3)
import boto3

# import two packages to help us with dates and date formatting
from time import gmtime, strftime

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table = dynamodb.Table('Pairings')

# store the current time in a human readable format in a variable
now = strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())


# define the handler function that the Lambda service will use as an entry point
def lambda_handler(event, context):

    # extract values from the event object we got from the Lambda service and store in a variable
    a = event['PID']
    b = event['DrinkDesc']
    c = event['DrinkItem']
    d = event['FoodDesc']
    e = event['FoodItem']
    f = event['Location']
    g = event['UID']

    # write data for new pairing to the DynamoDB table using the object we instantiated and save response in a variable
    response = table.put_item(
        Item={
            'PID': a,
            'DrinkDesc': b,
            'DrinkItem': c,
            'FoodDesc': d,
            'FoodItem': e,
            'Location': f,
            'UID': g
        })

    # return a properly formatted JSON object
    return json.dumps({'isSuccessful': 'true', 'PID': g})




