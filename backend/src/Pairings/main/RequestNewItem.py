# import the json utility package since we will be working with a JSON object
import json
import uuid
import base64
# import the AWS SDK (for Python the package name is boto3)
import boto3

# import two packages to help us with dates and date formatting
from time import gmtime, strftime

"""
This file implements a new pairing that will be added to the pairings database.
"""
client = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table = dynamodb.Table('RequestItems')

# store the current time in a human readable format in a variable
now = strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())

"""
    This function adds a new item request to the database.
    A rid is generated for the request.
    If any input is not passed in, the system does not add the new request.
    :returns JSON object saying whether it was successful, as well as the generated Pid
    
    event{
        "UID" : "",
        "Name" : "",
        "Description" : "",
        "Image" : "",
    
    }
    """

# define the handler function that the Lambda service will use as an entry point
def request_item(event, context):


    # generate unique id for pairing
    a = uuid.uuid4().hex
    response = client.upload_file('requirements.txt', 'harmonyitemrequests', 'requirements.txt')
    # write data for new pairing to the DynamoDB table using the object we instantiated and save response in a variable
    response = table.put_item(
        Item={
            'RID': a,
            'FoodDescription': event["Description"],
            'FoodName': event["Name"]
        })

    # return a properly formatted JSON object
    return{
        "StatusCode" : 200,
        "Data" : "Request has been sent"
    }


def validatestring(inputstring: str) -> bool:
    """
    :param inputstring: string going through validation check
    :type inputstring: string
    :returns true/false depending whether string is valid or not
    :rtype Boolean
    """
    # checking if string is empty (nothing entered including spaces.)
    # print("Check if the input is empty : ", end="")
    if not inputstring:
        # the string is empty
        # print("Invalid String")
        return False
    else:
        # not empty and check second condition
        # checking if string with space is empty
        if inputstring and not inputstring.isspace():
            # String valid
            return True
        else:
            # String invalid
            # print("Invalid String")
            return False
