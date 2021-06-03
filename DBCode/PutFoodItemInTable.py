from pprint import pprint
import boto3
import random


def put_FoodItem(name, location, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

    table = dynamodb.Table('FoodItem')
    id = random.randint(1000, 9999)
   # print(id)
    item = {'ID': id, 'Name': name, 'location': location}
    response = table.put_item(Item=item)
    return response


if __name__ == '__main__':
 #   foodItem_resp = put_FoodItem("Burger", "mcDonalds")
    print("Put food item succeeded:")
 #   foodItem_resp = put_FoodItem("Burger", "Spur")
    foodItem_resp = put_FoodItem("Spaghetti Bolognaise", "Mimmos")
    pprint(foodItem_resp, sort_dicts=False)
