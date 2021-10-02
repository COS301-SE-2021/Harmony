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
    location_name = event['LocationName']

    """Gets the business user data using the business id"""
    try:
        business_user_data = business_users_table.get_item(Key={'BID': bid})
    except ClientError as e:
        print(e.response['Error']['Message'])
        return {"StatusCode": 400}

    response_data = business_user_data["Item"]["Locations"]
    index = 0
    for k in business_user_data['Item']['Locations']:
        # traverse each item in Pairings and search for id the list
        # find id the break, because index is incrementing till id is found
        if k["Name"] == location_name:
            print("-----------Found")
            break
        index = index + 1

    """
    Write the updated locations to the table
    """

    """business_users_table.update_item(
        TableName=business_users_table_name,
        Key={
            'BID': bid
        },
        UpdateExpression="SET Locations = list_append(Locations, :locations)",
        ExpressionAttributeValues={':locations': response_data},
        ReturnValues="UPDATED_NEW"

    )"""
    print(index)
    try:

        table.update_item(
            Key={
                'BID': bid
            },
            # remove id at index of the Locations list
            UpdateExpression=f"remove Locations[{index}]",
            ConditionExpression=f"contains(Locations, :locations)",
            ExpressionAttributeValues={':locations': bid},
            ReturnValues="UPDATED_NEW"
        )

    except ClientError as e:
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            print(e.response['Error']['Message'])
            return {"StatusCode": 400}

    return {"StatusCode": 200}
