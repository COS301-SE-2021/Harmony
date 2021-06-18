import json

# import requests


def lambda_handler(event, context):
    # extract values from the event object we got from the Lambda service
    name = event['firstName'] + ' ' + event['lastName']
    # return a properly formatted JSON object
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda, ' + name)
    }