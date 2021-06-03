from pprint import pprint   #pretty print format for json
import boto3
import random


def putFoodItem(name, location, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

    table = dynamodb.Table('FoodItem')
    id = random.randint(1000, 9999)
    item = {'ID': id, 'Name': name, 'Location': location}
    response = table.put_item(Item=item)
    return id       #return id because this query doesnt return anything


#if __name__ == '__main__':
 #   foodItem_resp = put_FoodItem("Burger", "mcDonalds")
 #   print("Put food item succeeded:")
 #   foodItem_resp = put_FoodItem("Burger", "Spur")
  #  foodItem_resp = putFoodItem("Sushi", "John Dorys")
   # pprint(foodItem_resp, sort_dicts=False)
