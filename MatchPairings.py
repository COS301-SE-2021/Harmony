from MockFoodItem import FoodItem,FoodItemDatabase

burger=FoodItem("Burger","mcDonalds")
print(burger)
macAndCheese=FoodItem("Mac and Cheese","Panarottis")
sushi=FoodItem("sushi","John Dorys")

foodArray=[burger,macAndCheese,sushi]
print("Food Array:\n")
for i in foodArray:
    print(i)

database=FoodItemDatabase(foodArray)
spaghetti=FoodItem("Spaghetti Bolognaise","Mimmos")
database.add(spaghetti)
print("Check database\n\n")
print(database)

print(database.searchByName("Mac and Cheese"))
