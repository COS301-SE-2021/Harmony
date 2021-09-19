import json
import boto3
import uuid
import base64
from botocore.exceptions import ClientError

food_table_name = 'Foods'
drink_table_name = 'Drinks'
requestTable_name = 'RequestItems'

dynamodb = boto3.resource('dynamodb')
food_table = dynamodb.Table(food_table_name)
drink_table = dynamodb.Table(drink_table_name)
request_table = dynamodb.Table(requestTable_name)

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
    item_type = event['ItemType']
    generate_id = uuid.uuid4().hex
    imagelink = add_image_to_s3(event["Image"], generate_id)

    input_response = request_table.scan()
    requested_items = input_response['Items']

    food_response = food_table.scan()
    food_items = food_response['Items']

    drink_response = drink_table.scan()
    drink_items = drink_response['Items']

    # Checking if the item already exists in the Food table
    # No Check needed if the item exists in the Requested table because
    # at times the admin may want to add an item that they want.
    if item_type == 'Food':
        for w in food_items:
            if w['FoodName'] == name:
                return {"StatusCode": 400,
                        "ErrorMessage": "Item already exists in table."}
    else:
        for w in drink_items:
            if w['DrinkName'] == name:
                return {"StatusCode": 400,
                        "ErrorMessage": "Item already exists in table."}

    # Checks if the item is in the Request table.
    # If it is then delete the item.
    # If not do not delete.

    for i in requested_items:
        if i['FoodName'] == name:
            request_table.delete_item(Key={'RID': i['RID']})
            break

    # write data for new item to the DynamoDB table
    if item_type == 'Food':
        try:
            food_table.put_item(
                Item={
                    'FoodID': generate_id,
                    'FoodTags': tags,
                    'FoodDescription': description,
                    'FoodName': name,
                    'FoodImage': imagelink
                })
            return {"StatusCode": 200}

        except ClientError as e:
            if e.response['Error']['Code'] == "ConditionalCheckFailedException":
                print(e.response['Error']['Message'])

                return {"StatusCode": 400}
    else:
        try:
            drink_table.put_item(
                Item={
                    'DrinkID': generate_id,
                    'DrinkTags': tags,
                    'DrinkDescription': description,
                    'DrinkName': name,
                    'DrinkImage': imagelink
                })
            return {"StatusCode": 200}

        except ClientError as e:
            if e.response['Error']['Code'] == "ConditionalCheckFailedException":
                print(e.response['Error']['Message'])

                return {"StatusCode": 400}


def add_image_to_s3(base64image, imageid):
    imgdata = base64.b64decode(base64image)

    file_name_with_extension = f'newitem/{imageid}.jpg'
    obj = s3.Object(bucket_name, file_name_with_extension)
    obj.put(Body=imgdata, ContentType='image/jpeg')
    location = boto3.client('s3').get_bucket_location(Bucket=bucket_name)['LocationConstraint']
    # get object url
    object_url = "https://%s.s3-%s.amazonaws.com/%s" % (bucket_name, location, file_name_with_extension)
    return object_url
