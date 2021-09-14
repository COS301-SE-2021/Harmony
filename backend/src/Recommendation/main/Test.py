import json

# import the AWS SDK (for Python the package name is boto3)
import boto3

from botocore.exceptions import ClientError




# define the handler function that the Lambda service will use as an entry point
def test_function(event, context):
    return