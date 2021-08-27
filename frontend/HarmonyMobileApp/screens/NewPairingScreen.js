import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Header } from "react-native-elements";
import styles from "../styles";
// import DropDownPicker from 'react-native-dropdown-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';

import * as yup from "yup";
import { Formik } from "formik";
import AppTextInput from "../Components/AppTextInput";
import AppButton from "../Components/AppButton";
import AppLoadingIcon from "../Components/AppLoadingIcon";
function NewPairingScreen() {
  const [isLoading, setLoading] = useState(false);
  const [isErrorAlertVisible, setErrorAlertVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
      itemStyle={localStyles.itemStyle}
      itemTextStyle={{ color: "#6e6869" }}
      itemsContainerStyle={localStyles.itemsContainerStyle}
      items={responseData}
      resetValue={false}
      textInputProps={
        {
          placeholder: selectedItem.name,
          underlineColorAndroid: "transparent",
          style: localStyles.textInputProps,
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
      <Formik
        initialValues={{
          Username: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          //Form must be reset before signUp is called
          //This is because signUp will lead to navigating the user to the homeScreen
          //Then try to update the form
          //but because the signUp screen will be unmounted react native wont know what to do
          resetForm();
          await signUp(values);
        }}
        validationSchema={yup.object().shape({
          Username: yup
            .string()
            .min(2)
            .max(20)
            .matches(/^\S*$/, "Username may not contain spaces") //Contains no spaces
            .required("Please, provide your Username!"),
        })}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <View style={localStyles.container}>

            <View style={localStyles.container}>
              <View style={localStyles.body}>
                <DropDown responseData={data} type="food" selectedItem={selectedFood} setSelected={setSelectedFood} />
                <DropDown responseData={data} type="drink" selectedItem={selectedDrink} setSelected={setSelectedDrink} />
                <DropDown responseData={data} type="mealType" selectedItem={selectedMealType} setSelected={setSelectedMealType} />

                <AppTextInput
                  value={values.Username}
                  onChangeText={handleChange("Username")}
                  onBlur={() => setFieldTouched("Username")}
                  leftIcon="account"
                  placeholder="Enter Username"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  error={errors.Username}
                  touched={touched.Username}
                />
                {/* If the user has clicked on the input field and it is not valid */}
                {touched.Username && errors.Username && (
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                    {errors.Username}
                  </Text>
                )}
                <View style={{ alignItems: "center" }}>

                  <AppButton
                    title="Create"
                    disabled={!isValid}
                    onPress={handleSubmit}
                  />
                  <AppButton
                    title="Cancel"
                    disabled={!isValid}
                    onPress={handleSubmit}
                  />

                </View>
              </View>
            </View>
            {isErrorAlertVisible === true && (
              <AppAlert visible={true} message={modalMessage} type={"Error"} />
            )}
            {isLoading === true && <AppLoadingIcon />}
          </View>
        )}
      </Formik>
      {/* <Text>Selected item: {selectedFood.name}</Text>
      <Text>Selected item: {selectedDrink.name}</Text>
      <Text>Selected item: {selectedMealType.name}</Text> */}
    </View >
  );
}
export default NewPairingScreen;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: Platform.OS === "ios" ? 1 : 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemStyle: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderColor: '#bbb',
    borderBottomWidth: 0.2,
    borderBottomColor: "#cccccc",
    borderRadius: 20,
  },
  itemsContainerStyle: {
    maxHeight: "80%",
    borderRadius: 20,
    overflow: 'hidden'
  },
  textInputProps: {
    borderRadius: 25,
    marginBottom: 1,
    flexDirection: "row",
    padding: 15,
    borderWidth: 0.5,
    backgroundColor: "#f9f9f9",
    width: "100%",
    borderColor: "#ffffff00",
  }
})

