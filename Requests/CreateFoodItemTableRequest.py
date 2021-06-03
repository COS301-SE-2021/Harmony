from CreateFoodItemTable import createFoodItemTable
from CreateFoodItemTableResponse import createFoodItemTableResponse


class createFoodItemTableRequest:
    def __init__(self):
        pass

    def request(self):
        responseObject = createFoodItemTableResponse()
        responseText = createFoodItemTable()
        responseObject.setResponse(responseText)
        return responseObject
