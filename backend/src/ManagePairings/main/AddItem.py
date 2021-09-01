import json
import boto3
import uuid
import base64
from botocore.exceptions import ClientError

table_name = 'Foods'

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(table_name)

client = boto3.client('s3')
s3 = boto3.resource('s3')
bucket_name = 'harmonynewitem'

"""
Adds an item to the database via the admin webpage.

"""


def add_item(event, context):
    name = event['ItemName']
    description = event['ItemDescription']
    tags = event['ItemTags']
    image = event['ItemImage']
    generate_id = uuid.uuid4().hex

    # write data for new item to the DynamoDB table
    try:
        table.put_item(
            Item={
                'FoodID': generate_id,
                'FoodTags': tags,
                'FoodDescription': description,
                'FoodName': name,
                'FoodImage': image
            })
        return json.dumps({'StatusCode': 200})

    except ClientError as e:
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            print(e.response['Error']['Message'])

            return json.dumps({'StatusCode': 400})


def add_image_to_s3(base64image, imageid):
    imgdata = base64.b64decode(base64image)

    file_name_with_extension = f'newitem/{imageid}.jpg'
    obj = s3.Object(bucket_name, file_name_with_extension)
    obj.put(Body=imgdata, ContentType='image/jpeg')
    location = boto3.client('s3').get_bucket_location(Bucket=bucket_name)['LocationConstraint']
    # get object url
    object_url = "https://%s.s3-%s.amazonaws.com/%s" % (bucket_name, location, file_name_with_extension)
    return object_url
