import boto3
from boto3.dynamodb.conditions import Key


# queries must include the id
def queryFoodItem(id, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

    table = dynamodb.Table('FoodItem')
    response = table.query(
        KeyConditionExpression=Key('ID').eq(id)
    )
    return response['Items']


#if __name__ == '__main__':
 #   query_ID = 3161
  #  print(f"Food Item from {query_ID}")
   # foodItems = queryFoodItem(query_ID)
    #for x in foodItems:
     #   print(foodItems)
