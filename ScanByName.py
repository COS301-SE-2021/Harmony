from pprint import pprint
import boto3
from boto3.dynamodb.conditions import Key


def scan_foodItems(name, display_movies, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

    table = dynamodb.Table('FoodItem')
    scan_kwargs = {
        'FilterExpression': Key('Name').eq(name),  # the condition you want to scan on
        'ProjectionExpression': "#nme, #lctn",  # the attributes you want in the result
        'ExpressionAttributeNames': {"#nme": "Name", "#lctn": "location"}   # cant directly use Name because its a reserved keyword
    }

    done = False
    start_key = None
    while not done:
        if start_key:
            scan_kwargs['ExclusiveStartKey'] = start_key
        response = table.scan(**scan_kwargs)
        display_movies(response.get('Items', []))
        start_key = response.get('LastEvaluatedKey', None)
        done = start_key is None


if __name__ == '__main__':
    def print_movies(movies):
        for movie in movies:
            print(f"\n{movie['Name']} : {movie['location']}")


    name = "Burger"
    print(f"Looking for all occurences of {name} ")
    scan_foodItems(name, print_movies)
