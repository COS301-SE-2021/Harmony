import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  RefreshControl,
} from "react-native";
import styles from "../styles";
import {
  Feather,
} from "@expo/vector-icons";
import * as eva from "@eva-design/eva";
import { default as theme } from "../theme.json";
import {
  ApplicationProvider,
  Text,
} from "@ui-kitten/components";
import { useIsFocused } from "@react-navigation/native";
import { Header } from "react-native-elements";
import * as Location from 'expo-location';

import FilterModal from "../Components/FilterModal";
import Card from "../Components/Card"
import AppLoadingIcon from "../Components/AppLoadingIcon";
import AppAlert from "../Components/AppAlert";
import FilterContext from '../Components/FilterContext';

const CardScreen = ({ URL, headerVisible }) => {
  const API_URL = URL;
  //The loading of the flatlist

  //the api data
  const [data, setData] = useState([]);

  //controls all the filters
  const [isModalVisible, setModalVisible] = useState(false);                               //for the filter popup

  const [refreshing, setRefreshing] = useState(useIsFocused());
  const [isErrorAlertVisible, setErrorAlertVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const myFilterContext = useContext(FilterContext);

  //the refreshing of the flatlist
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    (async () => {
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
    })();
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  //toggles the modals visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));

  }, [myFilterContext.applyFilter]);

  //the api call for trending
  useEffect(() => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "UID": "u1",
        "Sort": myFilterContext.sortPairingType,
        "MealTags": myFilterContext.mealTagArray,
        "FoodTags": myFilterContext.foodTagArray,
        "DrinkTags": myFilterContext.drinkTagArray,
        "Distance": myFilterContext.range,
        "Latitude": myFilterContext.userLatitude,
        "Longitude": myFilterContext.userLongitude,
      })
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          setData(json.Data)
          //console.log("StatusCode Returned: " + json.StatusCode)
          setErrorAlertVisible(false);
          setRefreshing(false);

        }
        else if (json.StatusCode === 204) {
          //console.log(json)
          //console.log("ERRROR ENCOUNTERED");
          setRefreshing(false);
          // ClearAllFilters();
          //setModalMessage must come before setErrorAlertVisible
          setModalMessage(json.Data);
          setErrorAlertVisible(true);
        }
      })
      .catch((error) => alert(error))
  }, [refreshing]);

  const ClearAllFilters = () => {
    myFilterContext.clearFilter()
    myFilterContext.toggleFilter()
  };


  const ShowTitle = () => (
    <Text style={styles.TextLarge}> {myFilterContext.sortPairingType} </Text>
  );



  const filterButton = () => (
    <View style={[styles.flexRow, { paddingTop: "8%" }]}>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          toggleModal();
        }}
      >
        <Text>
          <Feather name="filter" size={22} color="white" />
        </Text>
      </Pressable>
      <Text style={{ width: "8%" }}></Text>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => toggleModal()}
      >
        <Text>
          <Feather name="search" size={22} color="white" />
        </Text>
      </Pressable>
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
          rightComponent={filterButton}
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
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={({ PID }, index) => PID}
            renderItem={({ item }) => (
              <Card
                dataSet={item}
              />
            )}
          />
        )}
      </View>
      {isErrorAlertVisible === true && (
        <AppAlert visible={true} message={modalMessage} type={"Error"} />
      )}
    </ApplicationProvider >
  );
};
export default CardScreen;