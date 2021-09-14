import json
import boto3

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
request_adverts_table_name = 'RequestAdverts'
request_adverts_table = dynamodb.Table(request_adverts_table_name)


def finalise_advert(event, context):
    # locations the ad will be used for.(Stores of the business)
    locations = event['Locations']

    # time for the add to be up in days.
    ad_time_period = event['TimeLimit']

    # target audience the business has selected for the pairing advert
    audience = event['Audience']

    advertID = event['AdvertID']
    status = 'Pending'

    request_adverts_table.update_item(
        TableName=request_adverts_table_name,
        Key={
            'RAID': advertID
        },
        ExpressionAttributeNames={'#V': 'AdvertStatus'},
        ExpressionAttributeValues={':v': status},
        UpdateExpression='SET #V = :v',
        ReturnValues="UPDATED_NEW"

    )

    return {"StatusCode": 200}
