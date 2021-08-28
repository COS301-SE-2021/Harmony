import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Header } from "react-native-elements";
import SearchableDropdown from 'react-native-searchable-dropdown';
import AppButton from "../Components/AppButton";
import * as Location from 'expo-location';
import { AppToast } from "../Components/AppToast";
import AppAlert from "../Components/AppAlert";
import AppLoadingIcon from "../Components/AppLoadingIcon";

function NewPairingScreen({ navigation }) {

  const GET_ALL_PAIRNGS_URL = "https://w6gduongvk.execute-api.eu-west-1.amazonaws.com/dev/getallpairingitems";
  const CREATE_PAIRNG_URL = "https://w6gduongvk.execute-api.eu-west-1.amazonaws.com/dev/createpairing";

  const [selectedFood, setSelectedFood] = useState({
    name: "Select your food...",
    id: 0,
  });

  const [selectedDrink, setSelectedDrink] = useState({
    name: "Select your drink...",
    id: 0,
  });

  const [selectedMealType, setSelectedMealType] = useState({
    name: "Select your meal type...",
    id: 0,
  });

  const [foodArray, setFoodArray] = useState([]);
  const [drinkArray, setDrinkArray] = useState([]);
  const [mealTypeArray, setMealTypeArray] = useState([]);

  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);

  const [isLoading, setLoading] = useState(false);
  const [isErrorAlertVisible, setErrorAlertVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("Oops, something went wrong.");

  useEffect(() => {
    setLoading(true);
    setErrorAlertVisible(false);

    fetch(GET_ALL_PAIRNGS_URL)
      .then((response) => response.json())
      .then((json) => {
        setFoodArray(json.Foods)
        setDrinkArray(json.Drinks)
        setMealTypeArray(json.MealTags)
        setLoading(false);

      })
      .catch((error) => {
        alert(error)
        setLoading(false)
        setModalMessage(json.Data);
        setErrorAlertVisible(true);

      })
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        //setModalMessage must come before setErrorAlertVisible
        setModalMessage("Permission to access location was denied");
        setErrorAlertVisible(true);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      let backPerm = await Location.requestBackgroundPermissionsAsync();
      // console.log(backPerm);//Handle
      setUserLatitude(location.coords.latitude)
      setUserLongitude(location.coords.longitude)

    })();
  }, []);

  const DropDown = ({ responseData, selectedItem, setSelected }) => (
    <SearchableDropdown
      onItemSelect={(item) => {
        setSelected({
          name: item.name,
          id: item.id
        });
      }}

      containerStyle={{ padding: 5 }}
      itemStyle={localStyles.dropdownItemStyle}
      itemTextStyle={{ color: "#6e6869" }}
      itemsContainerStyle={localStyles.dropdownContainerStyle}
      items={responseData}
      resetValue={false}
      textInputProps={
        {
          placeholder: selectedItem.name,
          placeholderTextColor: '#555',
          underlineColorAndroid: "transparent",
          style: localStyles.dropdownTextInput,
          onTextChange: text => console.log(text)
        }
      }
      listProps={
        {
          nestedScrollEnabled: true,
        }
      }
    />);

  //Function to remap the API response JSON
  //This is necessary inorder for the dropdown to 
  //render the items.
  // the specific format is needed:
  // id: 1,
  // name: myName
  const MapJSON = (array, type) => {
    var data = array.map(function (item) {
      if (type === "food") {
        return {
          id: item.FoodID,
          name: item.FoodName
        };
      }
      else if (type === "drink") {
        return {
          id: item.DrinkID,
          name: item.DrinkName
        };
      }
      else if (type === "mealType") {
        return {
          id: item.Mealid,
          name: item.TagName
        };
      }

    });
    return data;
  };

  async function createNewPairing() {

    console.log("Creating...")
    setLoading(true);

    await fetch(CREATE_PAIRNG_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "UID": "u1",
        "Foodid": selectedFood.id,
        "Drinkid": selectedDrink.id,
        "Mealtagid": selectedMealType.id,
        "Latitude": userLatitude,
        "Longitude": userLongitude,
      })
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        handleResponse(json)
      })
      .catch((error) => alert(error))
  };

  const handleResponse = (json) => {
    if (json.StatusCode === 200) {
      AppToast.ToastDisplay(json.Data);
      setErrorAlertVisible(false);
      setLoading(false);

      navigation.goBack()
    }
    else if (json.StatusCode === 400) {
      setLoading(false);

      //setModalMessage must come before setErrorAlertVisible
      setModalMessage(json.Data);
      setErrorAlertVisible(true);


    }
  }
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header
        statusBarProps={{ elevated: "true", backgroundColor: "black" }}
        placement="left"
        centerComponent={
          <Text style={{
            fontFamily: "sans-serif-light",
            fontSize: 35,
            fontWeight: "bold",
            textAlignVertical: "center",
          }}> Create New Pairing</Text>
        }
        containerStyle={{
          backgroundColor: "white",
        }}
      />
      {isLoading ? (
        <AppLoadingIcon />
      ) : (
        <View style={{ paddingTop: 50 }}>


          <DropDown responseData={MapJSON(foodArray, "food")} selectedItem={selectedFood} setSelected={setSelectedFood} />
          <DropDown responseData={MapJSON(drinkArray, "drink")} selectedItem={selectedDrink} setSelected={setSelectedDrink} />
          <DropDown responseData={MapJSON(mealTypeArray, "mealType")} selectedItem={selectedMealType} setSelected={setSelectedMealType} />
          <View style={{ alignItems: "center", flexDirection: "column" }}>
            <AppButton
              title="Create"
              disabled={isLoading}
              onPress={() => createNewPairing()}
            />

            <AppButton
              title="Cancel"
              disabled={isLoading}
              onPress={navigation.goBack}
            />
          </View>
        </View>
      )}

      {isErrorAlertVisible === true && (
        <AppAlert visible={true} message={modalMessage} type={"Error"} />
      )}

    </View>
  );
}
export default NewPairingScreen;

const localStyles = StyleSheet.create({
  dropdownItemStyle: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 0.2,
    borderBottomColor: "#cccccc",
    borderRadius: 20,
  },
  dropdownContainerStyle: {
    maxHeight: "80%",
    borderRadius: 20,
    overflow: 'hidden'
  },
  dropdownTextInput: {
    borderRadius: 20,
    marginBottom: 1,
    flexDirection: "row",
    padding: 15,
    borderWidth: 0.5,
    backgroundColor: "#f9f9f9",
    width: "100%",
    borderColor: "#ffffff00",
    fontSize: 18,
  },
})