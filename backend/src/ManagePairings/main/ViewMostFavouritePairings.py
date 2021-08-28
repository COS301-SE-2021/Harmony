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
    id_array = []

    # Count of the number of times the corresponding favourite paring was found in favourites
    count_array = []

    for pairing_count in pairings:
        pid = pairing_count['PID']
        id_array.append(pid)
        count_array.append(0)

    # step through the users and if the favourite is in the users row, add 1 to that corresponding item count.
    for specific_user in users:
        for user_fav_pairings in specific_user['FavouritePairings']:
            for k in range(len(id_array)):
                if user_fav_pairings == id_array[k]:
                    count_array[k] = count_array[k] + 1
                    break

    bubble_sort(id_array, count_array)

    for i in range(len(id_array)):
        print(id_array[i])
        print(count_array[i])
    return 0


# Now do a bubble sort to sort data from largest to smallest
# We do the sort manually instead of calling the built in sort function because
# we need both the parallel arrays to be in the correct order as they relate to each other.
def bubble_sort(id_array, count_array):

    len_array = len(id_array)

    # Traverse through all array elements
    for i in range(len_array - 1):

        # Last i elements are already in place
        for j in range(0, len_array - i - 1):

            # traverse the array from 0 to n-i-1
            # Swap if the element found is greater
            # than the next element
            if count_array[j] < count_array[j + 1]:
                id_array[j], id_array[j + 1] = id_array[j + 1], id_array[j]
                count_array[j], count_array[j + 1] = count_array[j + 1], count_array[j]
