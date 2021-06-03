from pprint import pprint  # pretty print format for json
import boto3
import random


def putPairing(name, drink, location, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

    table = dynamodb.Table('Pairings')
    id = random.randint(10000, 99999)
    item = {'ID': id, 'FoodName': name, 'Drink': drink, 'Location': location}
    response = table.put_item(Item=item)
    return id  # return id because this query doesnt return anything
