import json
import boto3

dynamodb = boto3.resource('dynamodb')

# use the DynamoDB object to select our table
table_name = 'ScannedItems'
table = dynamodb.Table(table_name)

food_name = 'Foods'
food_table = dynamodb.Table(food_name)


def get_flavours_most_used(event, context):
    # get the pairings in the database
    response = table.scan()
    scanned_items = response['Items']

    food_response = food_table.scan()
    foods = food_response['Items']

    flavours = []
    flavours_count = []

    for k in foods:
        for j in k['FoodTags']:
            found = False
            for p in range(len(flavours)):
                if flavours[p] == j:
                    flavours_count[p] = flavours_count[p] + 1
                    found = True
            if found == False:
                flavours.append(j)
                flavours_count.append(0)

    bubble_sort(flavours_count, flavours)

    return 0


def bubble_sort(flavours_count, flavours):
    n = len(flavours_count)

    # Traverse through all array elements
    for i in range(n - 1):

        # Last i elements are already in place
        for j in range(0, n - i - 1):

            # traverse the array from 0 to n-i-1
            # Swap if the element found is greater
            # than the next element
            if flavours_count[j] < flavours_count[j + 1]:
                flavours_count[j], flavours_count[j + 1] = flavours_count[j + 1], flavours_count[j]
                flavours[j], flavours[j + 1] = flavours[j + 1], flavours[j]
