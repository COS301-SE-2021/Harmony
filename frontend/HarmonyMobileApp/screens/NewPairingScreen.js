import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Header } from "react-native-elements";
import styles from "../styles";
// import DropDownPicker from 'react-native-dropdown-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';

function NewPairingScreen() {

  const items = [
    {
      id: 1,
      name: 'JavaScript',
    },
    {
      id: 2,
      name: 'Java',
    },
    {
      id: 3,
      name: 'Ruby',
    },
    {
      id: 4,
      name: 'React Native',
    },
    {
      id: 5,
      name: 'PHP',
    },
    {
      id: 6,
      name: 'Python',
    },
    {
      id: 7,
      name: 'Go',
    },
    {
      id: 8,
      name: 'Swift8',
    },
    {
      id: 9,
      name: 'Swift9',
    },
    {
      id: 10,
      name: 'Swift10',
    },
    {
      id: 11,
      name: 'Swift11',
    },
  ];


  const [selectedItems, setSelectedItems] = useState([]);


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
      {/* Single */}
      <SearchableDropdown
        onItemSelect={(item) => {
          const items = selectedItems;
          items.push(item)
          setSelectedItems({ selectedItems: items });
        }}
        containerStyle={{ padding: 5 }}
        onRemoveItem={(item, index) => {
          const items = state.selectedItems.filter((sitem) => sitem.id !== item.id);
          setSelectedItems({ selectedItems: items });
        }}
        itemStyle={{
          padding: 15,
          backgroundColor: '#f9f9f9',
          borderColor: '#bbb',
          borderBottomWidth: 0.2,
          borderBottomColor: "#cccccc",
          borderRadius: 20,
        }}
        itemTextStyle={{ color: "#6e6869" }}
        itemsContainerStyle={{
          maxHeight: "80%",
          borderRadius: 20,
          overflow: 'hidden'
        }}
        items={items}
        resetValue={false}
        textInputProps={
          {
            placeholder: "Select your food...",
            underlineColorAndroid: "transparent",
            style: {
              borderRadius: 20,
              marginBottom: 1,
              flexDirection: "row",
              padding: 15,
              borderWidth: 0.5,
              backgroundColor: "#f9f9f9",
              width: "100%",
              borderColor: "#ffffff00",
            },
            onTextChange: text => console.log(text)
          }
        }
        listProps={
          {
            nestedScrollEnabled: true,
          }
        }
      />
    </View>
  );
}
export default NewPairingScreen;