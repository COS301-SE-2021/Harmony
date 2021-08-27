import json
import boto3

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'Users'
table = dynamodb.Table(table_name)

pairing_name = 'Pairings'
pairing_table = dynamodb.Table(pairing_name)

def view_most_favourite_pairings(event, context):

    pairing_response = pairing_table.scan()
    pairings = pairing_response['Items']
    # array containing current pairing id's that were favourite
    lst = []

    #Count of the number of times the corresponding favourite paring was found in favourites
    lstcount = []

    for pairing_count in pairings:
        pid = pairing_count['PID']
        lst.append(pid)
        lstcount.append(1)
    return 0
"""
    itemfound = False

    for table_item_index in itemresponse:
        for user_fav_pairings in table_item_index['FavouritePairings']:
            for pairings_found in lst:
                if user_fav_pairings == pairings_found:
                    lstcount[pairings_found] = lstcount[pairings_found] + 1
                itemfound = True
                break

            if itemfound == False:
                lst.append(user_fav_pairings)
                lst.append(1)"""


