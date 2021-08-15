# import the json utility package since we will be working with a JSON object
import json
import uuid
# import the AWS SDK (for Python the package name is boto3)
import boto3

# import two packages to help us with dates and date formatting
from time import gmtime, strftime

"""
This file implements a new pairing that will be added to the pairings database.
"""

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table = dynamodb.Table('Pairings')

# store the current time in a human readable format in a variable
now = strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())


# define the handler function that the Lambda service will use as an entry point
def newpairing(event, context):
    """
    This function adds a new pairing to the database.
    A Pid is generated for the user.
    If any input is not passed in, the system does not add the new pairing.
    :returns JSON object saying whether it was successful, as well as the generated Pid
    """
    # extract values from the event object we got from the Lambda service and store in a variable
    # exits if the string is not correct.
    b = event['DrinkDesc']
    if not validatestring(b):
        exit()

    c = event['DrinkItem']
    if not validatestring(c):
        exit()

    d = event['FoodDesc']
    if not validatestring(d):
        exit()

    e = event['FoodItem']
    if not validatestring(e):
        exit()

    #TODO
    # Must implement location data instead of string in future
    f = event['Location']
    if not validatestring(f):
        exit()

    g = event['UID']
    if not validatestring(g):
        exit()
    # generate unique id for pairing
    a = uuid.uuid4().hex

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
    return json.dumps({'isSuccessful': 'true', 'PID': a})


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
