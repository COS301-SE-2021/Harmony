import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
} from "react-native";
import styles from "../styles";
import {
  Feather,
  SimpleLineIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as eva from "@eva-design/eva";
import { default as theme } from "../theme.json";
import {
  ApplicationProvider,
  Divider,
  Text,
} from "@ui-kitten/components";
import { useIsFocused } from "@react-navigation/native";
import { Header } from "react-native-elements";

import FilterModal from "../Components/FilterModal";
import IconsBar from "../Components/IconsBar";
const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 300;

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
  const [userLocation, setUserLocation] = useState();


  //the refreshing of the flatlist
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
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

  const filterButton = () => (
    <View style={{ flexDirection: "row" }}>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          toggleModal();
          // console.log("Was modal showing? " + isModalVisible);
        }}
      >
        <Text>
          <Feather name="filter" size={22} color="white" />
        </Text>
      </Pressable>
      <Text style={{ width: "8%" }}></Text>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
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
        statusBarProps={{ elevated: "true", backgroundColor: "white" }}
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
              <View style={{ paddingBottom: 15 }}>
                <View style={styles.cardContainer}>
                  <View style={styles.imageContainer}>
                    <View
                      style={{
                        flexDirection: "column",
                        textAlign: "center",
                        width: "50%",
                        height: 180,
                      }}
                    >
                      <Image
                        source={{ uri: item.FoodImage }}
                        style={styles.standardImage}
                      />
                      <Text style={styles.cardText}>{item.FoodItem}</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "column",
                        textAlign: "center",
                        width: "50%",
                        height: 180,
                      }}
                    >
                      <Image
                        source={{ uri: item.DrinkImage }}
                        style={styles.standardImage}
                      />

                      <Text style={styles.cardText}>{item.DrinkItem}</Text>
                    </View>
                  </View>

                  <Divider />
                  <View style={styles.tagsSection}>
                    <ScrollView
                      contentContainerStyle={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                    >
                      <View style={styles.rowContainer}>
                        {item.FoodTags.map((tag, index) => (
                          <View style={styles.tagContainer} key={index}>
                            {/*<FontAwesome name="tag" size={14} color="#fff" />*/}
                            <MaterialIcons
                              name="fastfood"
                              size={14}
                              color="#fff"
                            />
                            {/* Keeping outlined icons just incase we want to change to them for consistency overall */}
                            {/* The filled icons look better in this case though */}
                            {/* <Feather name="tag" size={16} color="#fff" /> */}
                            <Text style={styles.tagText}>{tag}</Text>
                          </View>
                        ))}

                        {item.FoodTags.map((tag, index) => (
                          <View
                            style={[
                              styles.tagContainer,
                              { backgroundColor: "#C41ED4" },
                            ]}
                            key={index}
                          >
                            {/*<FontAwesome name="tag" size={14} color="#fff" />*/}
                            <FontAwesome5
                              name="hamburger"
                              size={14}
                              color="#fff"
                            />
                            {/* Keeping outlined icons just incase we want to change to them for consistency overall */}
                            {/* The filled icons look better in this case though */}
                            {/* <Feather name="tag" size={16} color="#fff" /> */}
                            <Text style={styles.tagText}>{tag}</Text>
                          </View>
                        ))}
                        {item.DrinkTags.map((tag, index) => (
                          <View
                            style={[
                              styles.tagContainer,
                              { backgroundColor: "#1FBFBA" },
                            ]}
                            key={index}
                          >
                            {/*<FontAwesome name="tag" size={14} color="#fff" />*/}
                            <MaterialCommunityIcons
                              name="cup"
                              size={14}
                              color="#fff"
                            />
                            {/* Keeping outlined icons just incase we want to change to them for consistency overall */}
                            {/* The filled icons look better in this case though */}
                            {/* <Feather name="tag" size={16} color="#fff" /> */}
                            <Text style={styles.tagText}>{tag}</Text>
                          </View>
                        ))}
                      </View>
                    </ScrollView>
                  </View>
                  <Divider />
                  <View style={styles.locationBar}>
                    <SimpleLineIcons
                      name="location-pin"
                      style={{ paddingVertical: "3%", paddingRight: "2%" }}
                      size={26}
                      color="black"
                    />
                    <View
                      style={{
                        alignContent: "flex-end",
                        alignSelf: "flex-end",
                        flex: 1,
                        paddingRight: "1%",
                      }}
                    >
                      <Text style={styles.TextSmall}>{item.Location} </Text>
                      <Text style={styles.TextSmall}>35 KM</Text>
                    </View>
                  </View>
                  <Divider />

                  <IconsBar
                    dataSet={item}
                  />

                </View>
              </View>
            )}
          />
        )}
      </View>
    </ApplicationProvider >
  );
};


export default HomeScreen;
