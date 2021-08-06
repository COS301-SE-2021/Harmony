import React, { useEffect, useState } from "react";
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

// import { createStore } from "redux";
import ReduxStore from "../Components/ReduxStore"

import FilterModal from "../Components/FilterModal";
import Card from "../Components/Card"

const HomeScreen = (props) => {
  const viewPairingURL =
    "https://qkvdftfq7b.execute-api.eu-west-1.amazonaws.com/dev";
  //The loading of the flatlist
  const [isLoading, setLoading] = useState(useIsFocused());

  //the api data
  const [data, setData] = useState([]);

  //controls all the filters
  const [isModalVisible, setModalVisible] = useState(false);                               //for the filter popup
  const [sortPairings, setSortPairings] = useState("Trending");                            // the type of pairings shown filter

  const [refreshing, setRefreshing] = React.useState(false);

  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

  //the refreshing of the flatlist
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    GetLocation();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  //toggles the modals visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  //the api call for trending
  useEffect(() => {
    fetch(viewPairingURL)
      .then((response) => response.json())
      .then((json) => setData(json.Data))
      .catch((error) => alert(error))
      .then(setLoading(false));
  }, [refreshing]);

  const ShowTitle = () => (
    <Text style={styles.TextLarge}> {sortPairings} </Text>
  );

  const GetLocation = async () => {
    //status is response from permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    const location = await Location.getCurrentPositionAsync({});
    // const location = await Location.watchPositionAsync({timeInterval:2000},{});
    setUserLocation({ lat: location.coords.latitude, lng: location.coords.longitude });
    console.log("user location: " + userLocation.lat + ' ' + userLocation.lng);
  }

  const filterButton = () => (
    <View style={styles.flexRow}>
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
      {/* <StatusBar hidden={true} />
       */}
      <Header
        statusBarProps={{ elevated: "true", backgroundColor: "black" }}
        //   leftComponent={searchButton}
        placement="left"
        centerComponent={<ShowTitle />}
        centerContainerStyle={{ height: "15%" }}
        containerStyle={{
          backgroundColor: "white",
        }}
        rightComponent={filterButton}
      />
      <View style={{ height: "100%" }}>
        <View style={styles.centeredView}>
          {isModalVisible && <FilterModal />}
        </View>

        {isLoading ? (
          <ActivityIndicator />
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
    </ApplicationProvider >
  );
};



export default HomeScreen;
