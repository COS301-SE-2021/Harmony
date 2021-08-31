import json
import boto3
from datetime import date
import uuid
import base64
import io
from PIL import Image
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
client = boto3.client('s3')
s3 = boto3.resource('s3')
bucket_name = 'harmonynewitem'

# use the DynamoDB object to select our table
table_name = 'User_Feedback'
table = dynamodb.Table(table_name)

"""
This lambda function takes in information of the item that was scanned. 
The name of the item and whether the user deems if the scan was correct or not.
A date is also generated of when the user provides this feedback.
The function then adds the data to the database.
The data will be simplified and shown to the admin in the ViewSuccessRatio function.

event{
    "IsCorrect" : ,
    "FoodItem" : "name",
    "Image" : "base64"
}
"""


def ai_success_ratio(event, context):
    # is_correct is a boolean, either true or false
    is_correct = event['IsCorrect']
    food_item = event['FoodItem']
    today = date.today()
    # get_date = today.strftime("%d/%m/%Y")

    ufid = uuid.uuid4().hex
    imagelink = add_image_to_s3(event["Image"], ufid)

    try:
        table.put_item(
            Item={
                'UFID': ufid,
                'FoodName': food_item,
                'DateScanned': str(today),
                'CorrectlyIdentified': is_correct,
                'FoodImage': imagelink
            })
        return {'StatusCode': 200,
                "Data": "Feedback has been sent"}

    except ClientError as e:
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            print(e.response['Error']['Message'])

            return {'StatusCode': 400,
                    "Data": "Failed to send feedback"}


def add_image_to_s3(base64image, imageid):
    imgdata = base64.b64decode(base64image)

    file_name_with_extention = f'recognitionfeedback/{imageid}.jpg'
    obj = s3.Object(bucket_name, file_name_with_extention)
    response = obj.put(Body=imgdata, ContentType='image/jpeg')
    location = boto3.client('s3').get_bucket_location(Bucket=bucket_name)['LocationConstraint']
    # get object url
    object_url = "https://%s.s3-%s.amazonaws.com/%s" % (bucket_name, location, file_name_with_extention)
    return object_url
