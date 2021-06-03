import sys

sys.path.append(r"C:\Users\user\PycharmProjects\Harmony\Requests")
sys.path.append(r"C:\Users\user\PycharmProjects\Harmony\DBCode")
sys.path.append(r"C:\Users\user\PycharmProjects\Harmony\Response")

from CreateFoodItemTableRequest import createFoodItemTableRequest
from CreateFoodItemTableResponse import createFoodItemTableResponse

creationRequest = createFoodItemTableRequest()
creationResponse = creationRequest.request()

print(creationResponse.wasSuccessful)
