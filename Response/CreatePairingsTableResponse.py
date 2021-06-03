class createPairingsTableResponse:
    def __init__(self):
        self.wasSuccessful = False

    def setResponse(self, response):
        self.response = response
        if response.table_status == "ACTIVE":
            self.wasSuccessful = True

    def getResponse(self):
        return self.response

    def getWasSuccessful(self):
        return self.wasSuccessful
