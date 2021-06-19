import json
import boto3

client = boto3.resource('dynamodb')
table = client.Table('Pairings')


def lambda_handler(event, context):
    print("Hello Harmony")
    product_number = "p1"
    print(product_number)
    response = table.get_item(
        Key={
            'PID': product_number

        }
    )

    item = response['Item']
    food = item['FoodItem']
    item = response['Item']
    drink = item['DrinkItem']
    print("Match founds: " + food + " goes well with " + drink)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "A pairing has been found",
            "Food Item": food,
            "Drink Item": drink

        }),
    }

