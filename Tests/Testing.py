import sys

sys.path.append(r"C:\Users\user\PycharmProjects\Harmony\Requests")
sys.path.append(r"C:\Users\user\PycharmProjects\Harmony\DBCode")
sys.path.append(r"C:\Users\user\PycharmProjects\Harmony\Response")

from CreateFoodItemTableRequest import createFoodItemTableRequest
from CreateFoodItemTableResponse import createFoodItemTableResponse

from InsertFoodItemRequest import insertFoodItemRequest
from InsertFoodItemResponse import insertFoodItemResponse

from QueryFoodItemByIdRequest import queryFoodItemByIdRequest
from QueryFoodItemByIdResponse import queryFoodItemByIdResponse

from ScanByNameRequest import scanByNameRequest
from ScanByNameResponse import scanByNameResponse

# CREATE THE TABLE
creationRequest = createFoodItemTableRequest()
creationResponse = creationRequest.request()

print("Created table: " + str(creationResponse.wasSuccessful))

# INSERT INTO THE TABLE
insertRequest0 = insertFoodItemRequest("Burger", "Spur")
insertResponse0 = insertRequest0.insert()
print("Inserted Burger,Spur: " + str(insertResponse0.wasSuccessful))

insertRequest1 = insertFoodItemRequest("Burger", "Rocomamas")
insertResponse1 = insertRequest1.insert()
print("Inserted Burger,Rocomamas: " + str(insertResponse1.wasSuccessful))

insertRequest2 = insertFoodItemRequest("Burger", "Hudsons")
insertResponse2 = insertRequest2.insert()
print("Inserted Burger,Hudsons: " + str(insertResponse2.wasSuccessful))

insertRequest3 = insertFoodItemRequest("Bolognaise", "Mimmos")
insertResponse3 = insertRequest3.insert()
print("Inserted Bolognaise,Mimmos: " + str(insertResponse3.wasSuccessful))

insertRequest4 = insertFoodItemRequest("Sushi", "John Dorys")
insertResponse4 = insertRequest4.insert()
print("Inserted Sushi,John Dorys: " + str(insertResponse4.wasSuccessful))

# QUERY THE DB
queryByIdRequest0 = queryFoodItemByIdRequest(insertResponse4.getResponse())
queryByIdResponse0 = queryByIdRequest0.queryById()
print("Was sushi found?: "+str(queryByIdResponse0.wasSuccessful))

queryByIdRequest1 = queryFoodItemByIdRequest(1563)
queryByIdResponse1 = queryByIdRequest1.queryById()
print("Was not exist found?: "+str(queryByIdResponse1.wasSuccessful))

#   SCAN THE DB
scanByNameRequest0=scanByNameRequest("Burger")
scanByNameResponse0=scanByNameRequest0.scanByName()
print("Show results: "+scanByNameResponse0.getResponse())

