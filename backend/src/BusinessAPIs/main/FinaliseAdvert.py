import json
import boto3

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
request_adverts_table_name = 'RequestAdverts'
request_adverts_table = dynamodb.Table(request_adverts_table_name)

"""
This function takes in the configuration settings of the new advert which will be set by the business user.
The configurations consist of : 1) Locations targeted.
                                2) Audience targeted.
                                3) Time limit for the add (in days)
It then assigns the pending status to the pairing advert in the RequestAdverts database.
This database contains the pairings that the admin user still has to approve before they can go live within the system.
"""


def finalise_advert(event, context):
    # locations the ad will be used for.(Stores of the business)
    locations = event['Locations']

    # time for the add to be up in days.
    ad_time_period = event['TimeLimit']

    # target audience the business has selected for the pairing advert
    audience = event['Audience']

    advertID = event['AdvertID']
    status = 'Pending'

    num_locations = len(locations)
    num_audience = len(audience)
    price = calculate_cost(num_locations, num_audience, ad_time_period)
    print(price)

    request_adverts_table.update_item(
        TableName=request_adverts_table_name,
        Key={
            'RAID': advertID
        },
        ExpressionAttributeNames={'#V': 'Status',
                                  '#G': 'Locations',
                                  '#H': 'TimeLimit',
                                  '#L': 'TargetAudience',
                                  '#P': 'Price'},
        ExpressionAttributeValues={':v': status,
                                   ':g': locations,
                                   ':h': ad_time_period,
                                   ':l': audience,
                                   ':p': price},
        UpdateExpression='SET #V = :v, #G = :g, #H = :h, #L = :l, #P = :p',
        ReturnValues="UPDATED_NEW"

    )

    return {"StatusCode": 200}


"""
This function calculates the cost of an advert by taking in the parameters we decided to use.
    1) Number of locations
    2) Number of audiences targeted.
    3)Time limit (in days)
    
This data must be written to the database
"""


def calculate_cost(num_locations, num_audience, time_limit):
    cost = time_limit + (1 + num_locations * time_limit) + (1 * num_audience * time_limit)

    return cost