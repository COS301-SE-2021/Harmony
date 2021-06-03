from CreatePairingsTable import createPairingsTable
from CreatePairingsTableResponse import createPairingsTableResponse


class createPairingsTableRequest:
    def __init__(self):
        pass

    def request(self):
        responseObject = createPairingsTableResponse()
        responseText = createPairingsTable()
        responseObject.setResponse(responseText)
        return responseObject
