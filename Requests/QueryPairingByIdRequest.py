from GetPairingFromTable import queryPairing
from QueryPairingByIdResponse import queryPairingByIdResponse


class queryPairingByIdRequest:
    def __init__(self, id):
        self.id = id

    def queryById(self):
        responseObject = queryPairingByIdResponse()
        responseText = queryPairing(self.id)
        responseObject.setResponse(responseText)
        return responseObject
