from ScanByName import scanFoodItems
from ScanByNameResponse import scanByNameResponse


class scanByNameRequest:
    def __init__(self,name):
        self.name=name

    def scanByName(self):
        responseObject = scanByNameResponse()
        responseText = scanFoodItems(self.name)
        responseObject.setResponse(responseText)
        return responseObject
