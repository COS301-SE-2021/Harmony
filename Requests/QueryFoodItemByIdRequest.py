from GetFoodItemFromTable import queryFoodItem
from QueryFoodItemByIdResponse import queryFoodItemByIdResponse


class queryFoodItemByIdRequest:
    def __init__(self,id):
        self.id=id

    def scanById(self):
        responseObject = queryFoodItemByIdResponse()
        responseText = queryFoodItem(self.id)
        responseObject.setResponse(responseText)
        return responseObject
