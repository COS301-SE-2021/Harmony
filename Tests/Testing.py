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
scanRequest0 = queryFoodItemByIdRequest(insertResponse4.getResponse())
scanResponse0 = scanRequest0.scanById()
print("Was sushi found?: "+str(scanResponse0.wasSuccessful))

scanRequest1 = queryFoodItemByIdRequest(1563)
scanResponse1 = scanRequest1.scanById()
print("Was not exist found?: "+str(scanResponse1.wasSuccessful))
