import json
import boto3

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'Users'
table = dynamodb.Table(table_name)

pairing_name = 'Pairings'
pairing_table = dynamodb.Table(pairing_name)


def view_most_favourite_pairings(event, context):
    # get the pairings in the database
    pairing_response = pairing_table.scan()
    pairings = pairing_response['Items']

    # get the users data - which contains which favourites they have.
    users_response = table.scan()
    users = users_response['Items']

    initialize_count(pairings)

    # step through the users and if the favourite is in the users row, add 1 to that corresponding item count.
    for specific_user in users:
        for user_fav_pairings in specific_user['FavouritePairings']:
            for k in pairings:
                if user_fav_pairings == k['PID']:
                    k['Count'] = k['Count'] + 1
                    break

    sortedresponse = sortbycount(pairings)
    return{
        "StatusCode": 200,
        "Data": sortedresponse
    }


# this functions returns the json value we will want to sort by
def count_func(value):
    return value["Count"]


def sortbycount(response):
    # sort by count in descending order
    sortedResponse = sorted(response, key=count_func, reverse=True)
    return sortedResponse


def initialize_count(response):
    for i in response:
        i['Count'] = 0

    return response
