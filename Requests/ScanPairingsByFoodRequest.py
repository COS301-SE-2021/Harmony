from ScanPairingByFood import scanPairings
from ScanPairingsByFoodResponse import scanByFoodResponse


class scanPairingByFoodRequest:
    def __init__(self,name):
        self.name=name

    def scanByName(self):
        responseObject = scanByFoodResponse()
        responseText = scanPairings(self.name)
        responseObject.setResponse(responseText)
        return responseObject
