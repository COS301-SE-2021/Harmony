import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from "react-native";
import styles from "../styles";
import { Ionicons } from '@expo/vector-icons';
import * as eva from "@eva-design/eva";
import { default as theme } from "../theme.json";
import {
  ApplicationProvider,
  Text,
} from "@ui-kitten/components";
import { Header } from "react-native-elements";
import * as Location from 'expo-location';

import FilterModal from "../Components/FilterModal";
import Card from "../Components/Card"
import AppLoadingIcon from "../Components/AppLoadingIcon";
import AppAlert from "../Components/AppAlert";
import FilterContext from '../Components/FilterContext';
import FABNew from "../Components/FABNew";
// import { FAB } from 'react-native-paper';
import { Auth } from "aws-amplify";


const CardScreen = ({ navigation, URL, headerVisible, isDeleteVisible }) => {


  const API_URL = URL;
  //The loading of the flatlist

  //the api data
  const [data, setData] = useState([]);

  //controls all the filters
  const [isModalVisible, setModalVisible] = useState(false);                               //for the filter popup

  const [refreshing, setRefreshing] = useState(false);
  const [isErrorAlertVisible, setErrorAlertVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const myFilterContext = useContext(FilterContext);
  useEffect(() => {

    async function fetchData() {
      let user = await Auth.currentAuthenticatedUser();
      const { username } = user;

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        //setModalMessage must come before setErrorAlertVisible
        setModalMessage("Permission to access location was denied");
        setErrorAlertVisible(true);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      myFilterContext.setUserLatitude(location.coords.latitude)
      myFilterContext.setUserLongitude(location.coords.longitude)
      let backPerm = await Location.requestBackgroundPermissionsAsync();
      // console.log(backPerm);//Handle

      fetch(API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "UID": username,
          "Sort": myFilterContext.sortPairingType,
          "MealTags": myFilterContext.mealTagArray,
          "FoodTags": myFilterContext.foodTagArray,
          "DrinkTags": myFilterContext.drinkTagArray,
          "Distance": myFilterContext.range,
          "Latitude": location.coords.latitude,//Directly reference variable instead of context because its faster
          "Longitude": location.coords.longitude,
        })
      })
        .then((response) => response.json())
        .then((json) => {
          handleResponse(json)
        })
        .catch((error) => alert(error))
    };

    fetchData();


  }, [refreshing]);

  const handleResponse = (json) => {
    if (json.StatusCode === 200) {
      setData(json.Data)
      setErrorAlertVisible(false);
      setRefreshing(false);
    }
    else if (json.StatusCode === 204) {
      setRefreshing(false);
      setData([]);
      //setModalMessage must come before setErrorAlertVisible
      setModalMessage(json.Data);
      setErrorAlertVisible(true);
    }
    else {
      console.log(json);
    }
  }

  //toggles refresh
  const toggleRefresh = () => {
    setRefreshing(!refreshing);
  };

  //toggles the modals visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const ShowTitle = () => (
    <Text style={styles.TextLarge}> {myFilterContext.sortPairingType} </Text>
  );

  const FilterButton = () => (
    <View style={[styles.flexRow]}>
      <TouchableOpacity
        style={[styles.filterButton]}
        onPress={() => {
          toggleModal();
        }}
      >
        <Ionicons name="filter-sharp" size={35} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ApplicationProvider
      {...eva}
      theme={{ ...eva.light, ...theme }}
      style={styles.container}
    >
      {headerVisible &&
        <Header
          statusBarProps={{ elevated: "true", backgroundColor: "black" }}
          placement="left"
          centerComponent={<ShowTitle />}
          containerStyle={{
            backgroundColor: "white",
          }}
          rightComponent={FilterButton}
        />
      }
      <View style={{ flex: 1 }}>
        <View style={styles.centeredView}>
          {isModalVisible && <FilterModal sortPairingsName={myFilterContext.sortPairingType} />}
        </View>
        {refreshing ? (
          <AppLoadingIcon />
        ) : (
          <FlatList
            data={data}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={toggleRefresh} />
            }
            keyExtractor={({ PID }, index) => PID}
            renderItem={({ item }) => (
              <Card
                dataSet={item}
                isDeleteVisible={isDeleteVisible}
              />
            )}
          />
        )}
        <FABNew />

      </View>
      {isErrorAlertVisible === true && (
        <AppAlert visible={true} message={modalMessage} type={"Error"} />
      )}
    </ApplicationProvider >
  );
};
export default CardScreen;
