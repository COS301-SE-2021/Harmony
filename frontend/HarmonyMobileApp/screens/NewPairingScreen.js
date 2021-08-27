import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Header } from "react-native-elements";
import styles from "../styles";
// import DropDownPicker from 'react-native-dropdown-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import AppButton from "../Components/AppButton";

function NewPairingScreen() {

  const [selectedFood, setSelectedFood] = useState({
    name: "Select your food...",
  });
  const [selectedDrink, setSelectedDrink] = useState({
    name: "Select your drink...",
  });
  const [selectedMealType, setSelectedMealType] = useState({
    name: "Select your meal type...",
  });

  const [data, setData] = useState([]);
  const API_URL = "https://jsonplaceholder.typicode.com/users";
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => alert(error))
  }, []);

  const DropDown = ({ responseData, selectedItem, setSelected }) => (
    <SearchableDropdown
      onItemSelect={(item) => {
        setSelected(item);
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
      <View style={{ paddingTop: 40 }}>

        <DropDown responseData={data} type="food" selectedItem={selectedFood} setSelected={setSelectedFood} />
        <DropDown responseData={data} type="drink" selectedItem={selectedDrink} setSelected={setSelectedDrink} />
        <DropDown responseData={data} type="mealType" selectedItem={selectedMealType} setSelected={setSelectedMealType} />

        <TextInput
          style={localStyles.input}
          autoCapitalize="none"
          placeholderTextColor="#555"
          placeholder="Enter your location..."
          secureTextEntry={false}
        />
        <View style={{ alignItems: "center", flexDirection: "column" }}>
          <AppButton
            title="Create"
            disabled={false}
            onPress={() => console.log("aaaa")}
          />

          <AppButton
            title="Cancel"
            disabled={false}
            onPress={() => console.log("bbbb")}
          />
        </View>
      </View>

      {/* <Text>Selected item: {selectedFood.name}</Text>
      <Text>Selected item: {selectedDrink.name}</Text>
      <Text>Selected item: {selectedMealType.name}</Text> */}
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
  input: {
    padding: 15,
    margin: 5,
    width: "97%",
    fontSize: 18,
    color: '#555',
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 0.2,
    borderBottomColor: "#cccccc",
    borderRadius: 20,
  },
})