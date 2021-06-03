from pprint import pprint


class scanByFoodResponse:
    def __init__(self):
        self.wasSuccessful = False

    def setResponse(self, response):
        self.response = response
        if response:
            self.wasSuccessful=True

    def getResponse(self):
        return self.response

    def getWasSuccessful(self):
        return self.wasSuccessful
