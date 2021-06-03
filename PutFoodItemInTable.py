from pprint import pprint
import boto3


def put_FoodItem(name, location, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb',endpoint_url="http://localhost:8000")

    table = dynamodb.Table('FoodItem')
    item = {'ID': 9518, 'foodItem': {'name': name, 'location': location}}
    response = table.put_item(Item=item)
    return response


if __name__ == '__main__':
    movie_resp = put_FoodItem("burger", "mcDonalds")
    print("Put food item succeeded:")
    pprint(movie_resp, sort_dicts=False)
