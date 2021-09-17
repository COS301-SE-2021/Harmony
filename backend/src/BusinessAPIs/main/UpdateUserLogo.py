import json
import boto3
import base64
import uuid
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
business_users_table_name = 'BusinessUsers'
business_users_table = dynamodb.Table(business_users_table_name)

client = boto3.client('s3')
s3 = boto3.resource('s3')
bucket_name = 'harmonynewitem'

"""
This function takes in the user id and an image in base64.
It then updates the users logo.
"""


def update_user_logo(event, context):
    imageid = uuid.uuid4().hex
    bid = event['BID']

    # place the image in the s3 bucket and get the link

    image_link = add_image_to_s3(event["Logo"], imageid)

    business_users_table.update_item(
        TableName=business_users_table_name,
        Key={
            'BID': bid
        },
        ExpressionAttributeNames={'#V': 'Logo'},
        ExpressionAttributeValues={':v': image_link},
        UpdateExpression='SET #V = :v',
        ReturnValues="UPDATED_NEW"

    )
    return {"StatusCode": 200}


"""
This function adds an image to the s3 bucket and creates a link to be stored in the database.
"""


def add_image_to_s3(base64image, imageid):
    imgdata = base64.b64decode(base64image)

    file_name_with_extension = f'businessimages/{imageid}.jpg'
    obj = s3.Object(bucket_name, file_name_with_extension)
    obj.put(Body=imgdata, ContentType='image/jpeg')
    location = boto3.client('s3').get_bucket_location(Bucket=bucket_name)['LocationConstraint']
    # get object url
    object_url = "https://%s.s3-%s.amazonaws.com/%s" % (bucket_name, location, file_name_with_extension)
    return object_url
