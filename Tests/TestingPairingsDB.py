import sys

sys.path.append(r"C:\Users\user\PycharmProjects\Harmony\Requests")
sys.path.append(r"C:\Users\user\PycharmProjects\Harmony\DBCode")
sys.path.append(r"C:\Users\user\PycharmProjects\Harmony\Response")

from CreatePairingsTableRequest import createPairingsTableRequest
from CreatePairingsTableResponse import createPairingsTableResponse

from InsertPairingsRequest import insertPairingsRequest
from InsertPairingsResponse import insertPairingsResponse

# CREATE THE TABLE
creationRequest = createPairingsTableRequest()
creationResponse = creationRequest.request()

print("Created table: " + str(creationResponse.wasSuccessful))

#   ADD PAIRINGS

# INSERT INTO THE TABLE
insertRequest0 = insertPairingsRequest("Burger", "Coke", "Spur")
insertResponse0 = insertRequest0.insert()
print("Inserted Burger,Coke: " + str(insertResponse0.wasSuccessful))

insertRequest1 = insertPairingsRequest("Burger", "Hunters", "Rocomamas")
insertResponse1 = insertRequest1.insert()
print("Inserted Burger,Hunters: " + str(insertResponse1.wasSuccessful))

insertRequest2 = insertPairingsRequest("Burger", "Beer", "Hudsons")
insertResponse2 = insertRequest2.insert()
print("Inserted Burger,Beer: " + str(insertResponse2.wasSuccessful))

insertRequest3 = insertPairingsRequest("Bolognaise", "Red Wine", "Mimmos")
insertResponse3 = insertRequest3.insert()
print("Inserted Bolognaise,Red wine: " + str(insertResponse3.wasSuccessful))

insertRequest4 = insertPairingsRequest("Sushi", "White Wine", "John Dorys")
insertResponse4 = insertRequest4.insert()
print("Inserted Sushi,White wine: " + str(insertResponse4.wasSuccessful))
