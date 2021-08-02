import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
  Pressable,
  Picker,
  RefreshControl,
  StatusBar,
  TextInput,
  Animated,
  TouchableOpacity,
} from "react-native";
import styles from "../styles";
import {
  Feather,
  SimpleLineIcons,
  FontAwesome,
  Entypo,
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Modal from "react-native-modal";
import * as eva from "@eva-design/eva";
import { default as theme } from "../theme.json";
import {
  ApplicationProvider,
  Layout,
  Divider,
  Card,
  Text,
} from "@ui-kitten/components";
import { useIsFocused } from "@react-navigation/native";
import { Header, Slider, CheckBox } from "react-native-elements";

import FilterTag from "../Components/FilterTag";

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
  const [isModalVisible, setModalVisible] = useState(false); //for the filter popup
  const [sortPairings, setSortPairings] = useState("Trending"); // the type of pairings shown filter
  const [locationValue, setLocationValue] = useState(30); //distance filer

  //controls all the icons
  const [favouriteIconChecked, setFavouriteIconChecked] = useState("unchecked");
  const [favouriteIconColor, setFavouriteIconColor] = useState("black"); // controls the favourite heart color (pink/black)
  const [favouriteIconOutline, setFavouriteIconOutline] =
    useState("heart-outlined"); // controls whether the heart is filled in or outlined
  const [upIconChecked, setUpIconChecked] = useState("unchecked");
  const [upIconColor, setUpIconColor] = useState("black");
  const [upIconOutline, setUpIconOutline] = useState("upcircleo");
  const [downIconChecked, setDownIconChecked] = useState("unchecked");
  const [downIconColor, setDownIconColor] = useState("black");
  const [downIconOutline, setDownIconOutline] = useState("downcircleo");
  const [refreshing, setRefreshing] = React.useState(false);

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
  });
  handleDownIconPress = () => {
    if (upIconChecked == "unchecked") {
      if (downIconChecked == "unchecked") {
        setDownIconColor("#FF2727"),
          setDownIconOutline("downcircle"),
          console.log("pressed down checked"),
          setDownIconChecked("checked");
      } else {
        setDownIconColor("black"),
          setDownIconOutline("downcircleo"),
          console.log("pressed down unchecked"),
          setDownIconChecked("unchecked");
      }
    } else {
      setUpIconColor("black"),
        setUpIconOutline("upcircleo"),
        console.log("pressed up unchecked from else"),
        setUpIconChecked("unchecked"),
        setDownIconColor("#FF2727"),
        setDownIconOutline("downcircle"),
        console.log("pressed down checked from else "),
        setDownIconChecked("checked");
    }
  };

  handleUpIconPress = () => {
    if (downIconChecked == "unchecked") {
      if (upIconChecked == "unchecked") {
        setUpIconColor("#80CB41"),
          setUpIconOutline("upcircle"),
          console.log("pressed up checked"),
          setUpIconChecked("checked");
      } else {
        setUpIconColor("black"),
          setUpIconOutline("upcircleo"),
          console.log("pressed up unchecked"),
          setUpIconChecked("unchecked");
      }
    } else {
      setDownIconColor("black"),
        setDownIconOutline("downcircleo"),
        console.log("pressed down unchecked from else"),
        setDownIconChecked("unchecked"),
        setUpIconColor("#80CB41"),
        setUpIconOutline("upcircle"),
        console.log("pressed up checked from else"),
        setUpIconChecked("checked");
    }
  };

  handleFavouriteIconPress = () => {
    if (favouriteIconChecked == "unchecked") {
      setFavouriteIconColor("#FF2763"),
        setFavouriteIconOutline("heart"),
        console.log("pressed favourite checked"),
        setFavouriteIconChecked("checked");
    } else {
      setFavouriteIconColor("black"),
        setFavouriteIconOutline("heart-outlined"),
        console.log("pressed favourite unchecked"),
        setFavouriteIconChecked("unchecked");
    }
  };

  const ShowTitle = () => (
    <Text style={styles.TextLarge}> {sortPairings} </Text>
  );

  const filterButton = () => (
    <View style={{ flexDirection: "row" }}>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
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
      <StatusBar hidden={true} />
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
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ height: "100%" }}>
          <View style={styles.centeredView}>
            <Modal
              isVisible={isModalVisible}
              onBackButtonPress={toggleModal}
              onBackdropPress={toggleModal}
              animationIn={"slideInRight"}
              animationOut={"slideOutRight"}
              swipeDirection={["up", "left", "right", "down"]}
              onSwipeComplete={toggleModal}
            >
              <StatusBar hidden={true} />

              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.TextMedium,
                        {
                          fontWeight: "bold",
                          flex: 1,
                          justifyContent: "center",
                          paddingBottom: "7%",
                        },
                      ]}
                    >
                      Filter Pairings
                    </Text>
                    <TouchableOpacity
                      style={[styles.closeButton]}
                      onPress={() => setModalVisible(!isModalVisible)}
                    >
                      <MaterialCommunityIcons
                        name="close-circle-outline"
                        size={30}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.filterView}>
                    <View style={[styles.filterLabelRow]}>
                      <Text
                        style={[
                          styles.spaceLeft,
                          styles.TextSmall,
                          { paddingTop: 5 },
                        ]}
                      >
                        Sort Pairings
                      </Text>
                      <View style={[styles.spaceRight, { flex: 0 }]}>
                        <AntDesign
                          name="caretdown"
                          size={12}
                          style={{ paddingVertical: "10%", marginLeft: 10 }}
                          color="#7C7C7C"
                        />
                        <Text
                          style={[
                            styles.TextSmaller,
                            {
                              flex: 1,
                              textAlign: "center",
                              justifyContent: "center",
                            },
                          ]}
                        >
                          {" "}
                          {sortPairings}{" "}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.pickerView}>
                      <Picker
                        sortPairings={sortPairings}
                        style={[styles.TextSmall, { height: 40, width: 300 }]}
                        onValueChange={(itemValue, itemIndex) => {
                          setSortPairings(itemValue);
                          console.log(itemValue);
                        }}
                      >
                        <Picker.Item label="Trending" value="Trending" />
                        <Picker.Item label="Most Liked" value="Most Liked" />
                        <Picker.Item label="Newest" value="Newest" />
                        <Picker.Item
                          label="Controversial"
                          value="Controversial"
                        />
                      </Picker>
                    </View>
                  </View>
                  <Text style={{ height: 7 }}></Text>

                  <View style={styles.filterView}>
                    <View style={[styles.filterLabelRow]}>
                      <Text style={[styles.spaceLeft, styles.TextSmall]}>
                        Distance
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: -10,
                      }}
                    >
                      <Text style={[styles.TextSmall, { marginRight: 4 }]}>
                        0
                      </Text>
                      <Slider
                        value={locationValue}
                        step={20}
                        maximumValue={100}
                        onValueChange={(value) => (
                          console.log(value), setLocationValue(value)
                        )}
                        style={{ width: "70%" }}
                        thumbStyle={{
                          width: 20,
                          height: 20,
                          backgroundColor: "grey",
                        }}
                      />
                      <Text style={[styles.TextSmall, { marginLeft: 4 }]}>
                        100
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", justifyContent: "center" }}
                    >
                      <TextInput
                        style={[styles.TextSmall, styles.TextInputStyling]}
                        value={locationValue}
                        onChangeText={(value) =>
                          setLocationValue(parseInt(value))
                        }
                        keyboardType="numeric"
                        placeholder={locationValue.toString()}
                        multiline={false}
                      />
                      <Text style={[styles.TextSmaller]}>KM</Text>
                    </View>
                  </View>
                  <Text style={{ height: 7 }}></Text>

                  <View style={styles.filterView}>
                    <View style={[styles.filterLabel]}>
                      <View style={{ flexDirection: "row" }}>
                        <MaterialIcons
                          name="fastfood"
                          size={18}
                          style={{ paddingTop: 3, marginRight: 5 }}
                          color="black"
                        />
                        <Text style={[styles.spaceLeft, styles.TextSmall]}>
                          Meal Type
                        </Text>
                      </View>
                      <View style={[styles.filterTagsContainer]}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <FilterTag color="#FF6347" title="Breakfast" />
                          <FilterTag color="#FF6347" title="Lunch" />
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <FilterTag color="#FF6347" title="Supper" />
                          <FilterTag color="#FF6347" title="Snack" />
                        </View>
                      </View>
                    </View>
                  </View>
                  <Text style={{ height: 7 }}></Text>

                  <View style={styles.filterView}>
                    <View style={[styles.filterLabel]}>
                      <View style={{ flexDirection: "row" }}>
                        <MaterialCommunityIcons
                          name="cup"
                          size={18}
                          style={{ paddingTop: 9, marginRight: 5 }}
                          color="black"
                        />
                        <Text style={[styles.spaceLeft, styles.TextSmall]}>
                          Drinks
                        </Text>

                        <FilterTag color="#1FBFBA" title="Alcoholic" />
                      </View>
                      <View
                        style={[
                          styles.filterTagsContainer,
                          { flexDirection: "column" },
                        ]}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <FilterTag color="#1FBFBA" title="Fizzy" />
                          <FilterTag color="#1FBFBA" title="Sweet" />

                          <FilterTag color="#1FBFBA" title="Sour" />
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                          }}
                        >
                          <FilterTag color="#1FBFBA" title="Hot" />
                          <FilterTag color="#1FBFBA" title="Warm" />
                          <FilterTag color="#1FBFBA" title="Cold" />
                        </View>
                      </View>
                    </View>
                  </View>
                  <Text style={{ height: 7 }}></Text>

                  <View style={styles.filterView}>
                    <View style={[styles.filterLabel]}>
                      <View style={{ flexDirection: "row" }}>
                        <FontAwesome5
                          name="hamburger"
                          size={18}
                          style={{ paddingTop: 9, marginRight: 5 }}
                          color="black"
                        />
                        <Text style={[styles.spaceLeft, styles.TextSmall]}>
                          Food
                        </Text>
                        <FilterTag color="#C41ED4" title="Spicy" />
                        <FilterTag color="#C41ED4" title="Savoury" />
                      </View>
                      <View
                        style={[
                          styles.filterTagsContainer,
                          { flexDirection: "column" },
                        ]}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <FilterTag color="#C41ED4" title="Salty" />
                          <FilterTag color="#C41ED4" title="Sweet" />

                          <FilterTag color="#C41ED4" title="Sour" />
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                          }}
                        >
                          <FilterTag color="#C41ED4" title="Hot" />
                          <FilterTag color="#C41ED4" title="Warm" />

                          <FilterTag color="#C41ED4" title="Cold" />
                        </View>
                      </View>
                    </View>
                  </View>

                  <Text style={{ height: 7 }}></Text>
                  <Pressable
                    style={[styles.applyButton]}
                    onPress={() => setModalVisible(!isModalVisible)}
                  >
                    <Text
                      style={[
                        styles.TextSmall,
                        {
                          fontWeight: "bold",
                          color: "white",
                          textAlign: "center",
                        },
                      ]}
                    >
                      Apply
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>

          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
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

                    <View style={styles.iconsBar}>
                      <View style={{ flexDirection: "row" }}>
                        <Pressable
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                          onPress={handleDownIconPress}
                        >
                          <AntDesign
                            name={downIconOutline}
                            size={24}
                            color={downIconColor}
                          />
                          <Text
                            style={{
                              paddingLeft: "2%",
                              paddingRight: "5%",
                              paddingVertical: "1%",
                              fontFamily: "sans-serif-light",
                            }}
                          >
                            {item.Downvotes}
                          </Text>
                        </Pressable>
                        <Pressable
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            paddingRight: "10%",
                          }}
                          onPress={handleUpIconPress}
                        >
                          <AntDesign
                            name={upIconOutline}
                            size={24}
                            color={upIconColor}
                          />
                          <Text
                            style={{
                              paddingLeft: "2%",
                              paddingVertical: "1%",
                              fontFamily: "sans-serif-light",
                            }}
                          >
                            {item.Upvotes}
                          </Text>
                        </Pressable>
                      </View>
                      <Pressable onPress={handleFavouriteIconPress}>
                        <Entypo
                          name={favouriteIconOutline}
                          size={25}
                          color={favouriteIconColor}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </ScrollView>
    </ApplicationProvider>
  );
};

const personalStyles = StyleSheet.create({
  text: {
    fontSize: 42,
  },
  addToFavouriteBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#8d918d",
    flexDirection: "row",
  },
  drinkCard: {
    //Card style for drinks
    // borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    margin: 5,
    padding: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 3,
    resizeMode: "cover",
  },
  smallDrinkCard: {
    width: 150,
    height: 150,
  },
  bigDrinkCard: {
    width: 300,
    height: 300,
  },
});

export default HomeScreen;
