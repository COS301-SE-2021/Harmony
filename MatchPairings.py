from MockFoodItem import FoodItem,FoodItemDatabase,Pairing,MockPairingsDatabase

burger=FoodItem("Burger","mcDonalds")
print(burger)
macAndCheese=FoodItem("Mac and Cheese","Panarottis")
sushi=FoodItem("Sushi","John Dorys")

foodArray=[burger,macAndCheese,sushi]
print("\nFood Array:\n")
for i in foodArray:
    print(i)

database=FoodItemDatabase(foodArray)
spaghetti=FoodItem("Spaghetti Bolognaise","Mimmos")
database.add(spaghetti)
print("Check database\n\n")
print(database)

print(database.searchByName("Mac and Cheese"))


burgerAcoke=Pairing(burger,"Coke","Spur")
spaghettiAwine=Pairing(spaghetti,"Wine","Old Town Italy")
sushiAIcedTea=Pairing(sushi,"Iced Tea","John Dory's")
sushiACoke=Pairing(sushi,"Coke","John Dory's")
sushiAHunters=Pairing(sushi,"Hunters","John Dory's")
print("\nPairing was made")
print(burgerAcoke)

pairingArray=[burgerAcoke,spaghettiAwine,sushiAIcedTea,sushiACoke,sushiAHunters]
pairingsDatabase=MockPairingsDatabase(pairingArray)

macAndCheeseAWhiteWine=Pairing(macAndCheese,"White Wine","Panarottis")

pairingsDatabase.add(macAndCheeseAWhiteWine)
print(pairingsDatabase)
results=pairingsDatabase.searchByName("Sushi")
for i in results:
    print(i)
print(pairingsDatabase.searchByName("Not Exists"))
