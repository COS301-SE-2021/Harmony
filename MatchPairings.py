from MockFoodItem import FoodItem
burger=FoodItem("Burger","mcDonalds")
print(burger)
macAndCheese=FoodItem("Mac and Cheese","Panarottis")
sushi=FoodItem("sushi","John Dorys")

foodArray=[burger,macAndCheese,sushi]
print("Food Array:")
for i in foodArray:
    print(i)
print(foodArray)