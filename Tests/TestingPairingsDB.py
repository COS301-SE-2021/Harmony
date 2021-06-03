import sys

sys.path.append(r"C:\Users\user\PycharmProjects\Harmony\Requests")
sys.path.append(r"C:\Users\user\PycharmProjects\Harmony\DBCode")
sys.path.append(r"C:\Users\user\PycharmProjects\Harmony\Response")

from CreatePairingsTableRequest import createPairingsTableRequest
from CreatePairingsTableResponse import createPairingsTableResponse

# CREATE THE TABLE
creationRequest = createPairingsTableRequest()
creationResponse = creationRequest.request()

print("Created table: " + str(creationResponse.wasSuccessful))