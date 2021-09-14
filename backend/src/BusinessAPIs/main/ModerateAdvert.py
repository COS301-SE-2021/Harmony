import json
import boto3

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
request_adverts_table_name = 'RequestAdverts'
request_adverts_table = dynamodb.Table(request_adverts_table_name)


def moderate_advert(event, context):
    # The id of the advert
    advertID = event['AdvertID']

    # Either Accept/Reject
    status = event['Status']

    if status == 'Accepted':
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
    #else write rejected status and the set the cost back to 0
    return {"StatusCode": 200}
