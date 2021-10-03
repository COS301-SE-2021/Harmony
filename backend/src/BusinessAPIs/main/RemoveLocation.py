import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'BusinessPairings'
table = dynamodb.Table(table_name)

business_users_table_name = 'BusinessUsers'
business_users_table = dynamodb.Table(business_users_table_name)


def remove_location(event, context):
    bid = event['BID']
    location_id = event['LocationID']
    location_address = event['LocationAddress']

    """Gets the business user data using the business id"""
    try:
        business_user_data = business_users_table.get_item(Key={'BID': bid})
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {"StatusCode": 400}

    response_data = business_user_data["Item"]["Locations"]
    index = 0
    for k in business_user_data['Item']['Locations']:
        # traverse each item in Locations
        # if we find the address in the dataabse we can break the loop. The index is set.
        if k["Address"] == location_address:
            print("-----------Found")
            del response_data[index]
            break
        index = index + 1

    """
    Write the updated locations to the table
    """
    try:
        business_users_table.update_item(
            TableName=business_users_table_name,
            Key={
                'BID': bid
            },
            ExpressionAttributeNames={'#V': "Locations"},
            ExpressionAttributeValues={':v': response_data},
            UpdateExpression='SET #V = :v',
            ReturnValues="UPDATED_NEW"

        )
    except ClientError as e:
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            print(e.response['Error']['Message'])
            return {"StatusCode": 400}

    return {"StatusCode": 200}
