from pprint import pprint
class insertFoodItemResponse:
    def __init__(self):
        self.wasSuccessful = False

    def setResponse(self, response):
        self.response = response
       # pprint(response)
        self.wasSuccessful=True
        #query does not return anything
       # if response['HTTPStatusCode'] == 200:
        #    self.wasSuccessful = True

    def getResponse(self):
        return self.response

    def getWasSuccessful(self):
        return self.wasSuccessful
