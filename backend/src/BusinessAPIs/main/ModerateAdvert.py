import json
import boto3
from botocore.exceptions import ClientError
import uuid

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
request_adverts_table_name = 'RequestAdverts'
request_adverts_table = dynamodb.Table(request_adverts_table_name)

business_pairings_table_name = 'BusinessPairings'
business_pairings_table = dynamodb.Table(business_pairings_table_name)

"""
This function takes in whether the admin user has Accepted/Rejected the advert pairing.

If the advert is approved the pairing can be sent to the database with the live adverts and set the status to Active in
the RequestAdverts table.

If the advert is declined, set the cost to 0 and set the status to declined.
"""


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
            ExpressionAttributeNames={'#V': 'Status'},
            ExpressionAttributeValues={':v': status},
            UpdateExpression='SET #V = :v',
            ReturnValues="UPDATED_NEW"

        )

        """Gets the request advert data to put into the actual advert table."""
        try:
            request_advert_data = request_adverts_table.get_item(Key={'RAID': advertID})
        except ClientError as e:
            print(e.response['Error']['Message'])
            return {"StatusCode": 400}


        bpid = uuid.uuid4().hex
        # write data for new advert to the DynamoDB table.
        business_pairings_table.put_item(
            Item={
                'BPID': bpid,
                'DrinkName': request_advert_data["Item"]["DrinkName"],
                'PairingDescription': request_advert_data["Item"]["PairingDescription"],
                'PairingTags': request_advert_data["Item"]["PairingTags"],
                'FoodName': request_advert_data["Item"]["FoodName"],
                'BID': request_advert_data["Item"]["BID"],
                'FoodTags': request_advert_data["Item"]["FoodTags"],
                'DrinkTags': request_advert_data["Item"]["DrinkTags"],
                'DrinkImage': request_advert_data["Item"]["DrinkImage"],
                'FoodImage': request_advert_data["Item"]["FoodImage"],
                'Price': request_advert_data["Item"]["Price"],
                'Status': request_advert_data["Item"]["Status"],
                'TargetAudience': request_advert_data["Item"]["TargetAudience"],
                'TimeLimit': request_advert_data["Item"]["TimeLimit"]
            })
    else:
        # else write rejected status and the set the cost back to 0
        cost = 0
        request_adverts_table.update_item(
            TableName=request_adverts_table_name,
            Key={
                'RAID': advertID
            },
            ExpressionAttributeNames={'#V': 'Status',
                                      '#G': 'Price'},
            ExpressionAttributeValues={':v': status,
                                       ':g': cost},
            UpdateExpression='SET #V = :v, #G = :g',
            ReturnValues="UPDATED_NEW"
        )



    return {"StatusCode": 200}
