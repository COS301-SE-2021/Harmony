from MockFoodItem import FoodItem
burger=FoodItem("Burger","mcDonalds")
print(burger.location)
macAndCheese=FoodItem("Mac and Cheese","Panarottis")
sushi=FoodItem("sushi","John Dorys")

foodArray=[burger,macAndCheese,sushi]
for i in foodArray:
    print(i.food," ",i.location," ")
print(foodArray)