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
    time_period = event["TimePeriod"][0]
    radius = event["Radius"]
    today = date.today()

    # generate unique id for business request pairing
    bpid = uuid.uuid4().hex

    # generate id for images.
    generate_id1 = uuid.uuid4().hex
    generate_id2 = uuid.uuid4().hex

    # Standard days is 7
    days = 7

    if time_period == "One Day":
        days = 1
    elif time_period == "One Month":
        days = 30
    elif time_period == "Three Months":
        days = 90
    elif time_period == "Six Months":
        days = 180
    elif time_period == "One Week":
        days = 7
    elif time_period == "One Year":
        days = 365

    # place the image in the s3 bucket and get the link

    food_image_link = add_image_to_s3(event["FoodImage"], generate_id1)
    drink_image_link = add_image_to_s3(event["DrinkImage"], generate_id2)
    cost = calculate_cost(len(locations), days, radius)

    """Gets the business user data for the location using the business id"""
    try:
        location_data = business_user_table.get_item(Key={'BID': businessID})
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {"StatusCode": 400}

    coord = []
    user_location_data = location_data['Item']['Locations']
    count = 0
    for i in locations:
        for k in user_location_data:
            if i == k['Name']:
                coord.append({"Latitude": f"{k['Latitude']}",
                                "Longitude": f"{k['Longitude']}"})
                break
        count = count + 1

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
            'Status': "Active",
            'DateCreated': str(today),
            'Price': cost,
            'Radius': radius,
            'CoordinatesList': coord
        })

    """Gets the business user data using the business id"""
    try:
        business_user_data = business_user_table.get_item(Key={'BID': businessID})
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {"StatusCode": 400}



    # gets the current users outstanding amount
    user_data = business_user_data["Item"]
    new_amount = user_data["OutstandingAmount"] + cost

    """
        Writes the new outstanding amount to the business users table.
    """
    business_user_table.update_item(
        TableName=business_user_table_name,
        Key={
            'BID': businessID
        },
        ExpressionAttributeNames={'#V': 'OutstandingAmount'},
        ExpressionAttributeValues={':v': new_amount},
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


"""
This function calculates the cost of an advert by taking in the parameters we decided to use.
    1) Number of locations
    2) Number of audiences targeted.
    3)Time limit (in days)

This data must be written to the database
"""


def calculate_cost(num_locations, time_limit, radius):
    cost = time_limit + (2 * num_locations * time_limit) + radius

    return cost
