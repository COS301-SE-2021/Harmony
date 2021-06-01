class FoodItem:
    def __init__(self,food,location):
        self.food=food
        self.location=location

    def  __str__(self): #used to format the print()
        return "Name: "+str(self.food)+" Location: "+str(self.location)