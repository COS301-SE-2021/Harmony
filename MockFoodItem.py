class FoodItem:
    def __init__(self,food,location):
        self.food=food
        self.location=location

    def  __str__(self): #used to format the print()
        return "Name: "+str(self.food)+" Location: "+str(self.location)

class FoodItemDatabase:
    data=[]
    def __init__(self,data):
        self.data=data

    def add(self,fooditem):
        self.data.append(fooditem)

    def search(self,name):
        for i in self.data:
            if i.food==name:
                return i

    def __str__(self):
        result=""
        for i in self.data:
            result=result+str(i.food)+" found at "+str(i.location)+" \n"
        return result

