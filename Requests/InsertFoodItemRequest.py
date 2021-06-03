from PutFoodItemInTable import putFoodItem
from InsertFoodItemResponse import insertFoodItemResponse


class insertFoodItemRequest:
    def __init__(self,name,location):
        self.name=name
        self.location=location

    def insert(self):
        responseObject = insertFoodItemResponse()
        responseText = putFoodItem(self.name,self.location)
        responseObject.setResponse(responseText)
        return responseObject
