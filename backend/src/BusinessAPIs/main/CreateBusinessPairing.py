import json
import boto3
import uuid
import base64
from botocore.exceptions import ClientError
from datetime import date, timedelta, datetime
from datetime import time
from datetime import datetime

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'BusinessPairings'
table = dynamodb.Table(table_name)

business_user_table_name = 'BusinessUsers'
business_user_table = dynamodb.Table(business_user_table_name)

client = boto3.client('s3')
s3 = boto3.resource('s3')
bucket_name = 'harmonynewitem'

"""
This function adds the business users pairing to the corresponding table.
A check needs to occur in the business user table to ensure the business is not surpassing their account limit.
If the user paid for 5 adverts they should only be able to create 5 pairings.
"""


def create_business_pairing(event, context):
    drink_item = event['DrinkName']
    food_item = event['FoodName']
    businessID = event['BID']
    food_tags = event["FoodTags"]
    drink_tags = event["DrinkTags"]
    pairing_tags = event["PairingTags"]
    pairing_description = event["Description"]
    locations = event["Locations"]
    time_period = event["TimePeriod"]
    today = date.today()

    """Gets the business user data that we will need to process before they can add their pairing."""
    try:
        business_user_data = business_user_table.get_item(Key={'BID': businessID})
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {"StatusCode": 400}

    # generate unique id for business request pairing
    bpid = uuid.uuid4().hex

    # generate id for images.
    generate_id1 = uuid.uuid4().hex
    generate_id2 = uuid.uuid4().hex

    # place the image in the s3 bucket and get the link

    food_image_link = add_image_to_s3(event["FoodImage"], generate_id1)
    drink_image_link = add_image_to_s3(event["DrinkImage"], generate_id2)

    # write data for new pairing to the DynamoDB table using the object we instantiated and save response in a variable
    table.put_item(
        Item={
            'BPID': bpid,
            'DrinkName': drink_item,
            'PairingDescription': pairing_description,
            'PairingTags': pairing_tags,
            'FoodName': food_item,
            'BID': businessID,
            'FoodTags': food_tags,
            'DrinkTags': drink_tags,
            'DrinkImage': food_image_link,
            'FoodImage': drink_image_link,
            'Locations': locations,
            'TimeLimit': time_period,
            'Status': "Pending",
            'DateCreated': str(today)
        })

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
