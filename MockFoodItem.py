class FoodItem:
    def __init__(self,name,location):
        self.name=name
        self.location=location

    def  __str__(self): #used to format the print()
        return "Name: "+str(self.name)+" Location: "+str(self.location)

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
            result=result+str(i.name)+" found at "+str(i.location)+" \n"
        return result

    def searchByName(self,name):
        for i in self.data:
            if i.name==name:
                return i
        return "not found"

