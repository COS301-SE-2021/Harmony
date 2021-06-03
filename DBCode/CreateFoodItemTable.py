import boto3


def createFoodItemTable(dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")
        # remove endpoint to use ddb in aws endpoint is to tell local db
    table = dynamodb.Table('FoodItem')
    table.delete()
    table = dynamodb.create_table(
        TableName="FoodItem",
        KeySchema=[
            {
                'AttributeName': 'ID',
                'KeyType': 'HASH'  # Partition key
            },
            {
                'AttributeName': 'Name',
                'KeyType': 'RANGE'  # Sort key
            }
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'ID',
                'AttributeType': 'N'
            },
            {
                'AttributeName': 'Name',
                'AttributeType': 'S'
            },

        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 10,
            'WriteCapacityUnits': 10
        }
    )
    return table

# if __name__ == '__main__':
#  foodItemTable = createFoodItemTable()
# print("Table status:", foodItemTable.table_status)
