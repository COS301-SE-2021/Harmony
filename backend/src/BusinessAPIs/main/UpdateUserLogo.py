import json
import boto3

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
request_adverts_table_name = 'BusinessUsers'
request_adverts_table = dynamodb.Table(request_adverts_table_name)

"""
This function takes in the user id and an image in base64.
It then updates the users logo.
"""


def update_user_logo(event, context):


    return {"StatusCode": 200}