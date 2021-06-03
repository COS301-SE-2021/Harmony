from pprint import pprint
class insertFoodItemResponse:
    def __init__(self):
        self.wasSuccessful = False

    def setResponse(self, id):
       # pprint(response)
        if id:
            self.wasSuccessful=True
            self.response=id
        #query does not return anything


    def getResponse(self):
        return self.response

    def getWasSuccessful(self):
        return self.wasSuccessful
