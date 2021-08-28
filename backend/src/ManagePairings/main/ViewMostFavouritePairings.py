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

    # array containing current pairing id's that were favourite
    lst = []

    # Count of the number of times the corresponding favourite paring was found in favourites
    lstcount = []

    for pairing_count in pairings:
        pid = pairing_count['PID']
        lst.append(pid)
        lstcount.append(1)

    # step through the users and if the favourite is in the users row, add 1 to that corresponding item count.
    for specific_user in users:
        for user_fav_pairings in specific_user['FavouritePairings']:
            for k in lst:
                if user_fav_pairings == lst[k]:
                    lstcount[k] = lstcount[k] + 1

    # Now do a bubble sort to sort data from largest to smallest
    # We do the sort manually instead of calling the built in sort function because
    # we need both the parallel arrays to be in the correct order as they relate to each other.

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
