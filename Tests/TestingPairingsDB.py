import sys

sys.path.append(r"C:\Users\user\PycharmProjects\Harmony\Requests")
sys.path.append(r"C:\Users\user\PycharmProjects\Harmony\DBCode")
sys.path.append(r"C:\Users\user\PycharmProjects\Harmony\Response")

from CreatePairingsTableRequest import createPairingsTableRequest
from CreatePairingsTableResponse import createPairingsTableResponse

from InsertPairingsRequest import insertPairingsRequest
from InsertPairingsResponse import insertPairingsResponse

from QueryPairingByIdRequest import queryPairingByIdRequest
from QueryPairingByIdResponse import queryPairingByIdResponse

from ScanPairingsByFoodRequest import scanPairingByFoodRequest
from ScanPairingsByFoodResponse import scanByFoodResponse

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

# QUERY THE DB
queryByIdRequest0 = queryPairingByIdRequest(insertResponse4.getResponse())
queryByIdResponse0 = queryByIdRequest0.queryById()
print("Sushis's drink : "+str(queryByIdResponse0.getResponse()))

queryByIdRequest1 = queryPairingByIdRequest(1563)
queryByIdResponse1 = queryByIdRequest1.queryById()
print("Was not exist found?: "+str(queryByIdResponse1.wasSuccessful))

#   SCAN THE DB
scanByNameRequest0=scanPairingByFoodRequest("Burger")
scanByNameResponse0=scanByNameRequest0.scanByName()
print("Show results: "+scanByNameResponse0.getResponse())



