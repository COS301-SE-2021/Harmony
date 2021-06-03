from PutPairingInTable import putPairing
from InsertPairingsResponse import insertPairingsResponse


class insertPairingsRequest:
    def __init__(self, name, drink, location):
        self.name = name
        self.drink = drink
        self.location = location

    def insert(self):
        responseObject = insertPairingsResponse()
        responseText = putPairing(self.name, self.drink, self.location)
        responseObject.setResponse(responseText)
        return responseObject
