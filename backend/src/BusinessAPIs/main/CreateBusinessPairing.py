import json
import boto3
import uuid
import base64
from botocore.exceptions import ClientError

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
    drink_item = event['DrinkItem']
    food_item = event['FoodItem']
    price = event['Price']
    businessID = event['BID']
    target_audience = event['Audience']
    food_tags = event["FoodTags"]
    drink_tags = event["DrinkTags"]
    pairing_tags = event["PairingTags"]
    pairing_description = event["Description"]

    """Gets the business user data that we will need to process before they can add their pairing."""
    try:
        business_user_data = business_user_table.get_item(Key={'BID': businessID})
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {"StatusCode": 400}

    """
    Checks if the business user has credit available.   
    """
    if business_user_data["Item"]["PairingsAvailable"] == 0:
        return {"StatusCode": 400,
                "ErrorMessage": "Business User has no remaining pairing credit left."}

    pairings_used, pairings_available = adjust_user_credit(business_user_data)

    # generate unique id for business pairing
    bpID = uuid.uuid4().hex

    # generate id for images.
    generate_id1 = uuid.uuid4().hex
    generate_id2 = uuid.uuid4().hex

    # place the image in the s3 bucket and get the link

    food_image_link = add_image_to_s3(event["FoodImage"], generate_id1)
    drink_image_link = add_image_to_s3(event["DrinkImage"], generate_id2)

    # write data for new pairing to the DynamoDB table using the object we instantiated and save response in a variable
    table.put_item(
        Item={
            'BPID': bpID,
            'DrinkItem': drink_item,
            'PairingDescription': pairing_description,
            'PairingTags': pairing_tags,
            'FoodItem': food_item,
            'Price': price,
            'BID': businessID,
            'FoodTags': food_tags,
            'DrinkTags': drink_tags,
            'TargetAudience': target_audience,
            'DrinkImage': food_image_link,
            'FoodImage': drink_image_link
        })

    update_business_user_database(businessID, pairings_used, pairings_available)

    return {"StatusCode": 200}


"""
This function adjusts the user credit.
It takes in a business user that we get from the main lambda function.
It returns the updated pairings used and pairings available.
"""


def adjust_user_credit(business_user):
    pairings_used = business_user["Item"]["PairingsUsed"]
    pairings_available = business_user["Item"]["PairingsAvailable"]

    pairings_used = pairings_used + 1
    pairings_available = pairings_available - 1

    # to use in return : pairings_used, pairings_available = adjust_user_credits(x,y)
    return pairings_used, pairings_available


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


"""
Updates the business user's database with the updated pairings_used/pairings_available.
"""


def update_business_user_database(bid, pairings_used, pairings_available):
    business_user_table.update_item(
        TableName=business_user_table_name,
        Key={
            'BID': bid
        },
        ExpressionAttributeNames={'#V': 'PairingsUsed'},
        ExpressionAttributeValues={':v': pairings_used},
        UpdateExpression='SET #V = :v',
        ReturnValues="UPDATED_NEW"

    )

    business_user_table.update_item(
        TableName=business_user_table_name,
        Key={
            'BID': bid
        },
        ExpressionAttributeNames={'#T': 'PairingsUsed'},
        ExpressionAttributeValues={':t': pairings_available},
        UpdateExpression='SET #T = :t',
        ReturnValues="UPDATED_NEW"

    )
