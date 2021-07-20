import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
  Modal,
  Pressable,
  Picker
} from "react-native";
import styles from "../styles";
import {
  Feather, SimpleLineIcons, FontAwesome,
} from '@expo/vector-icons';
import * as eva from '@eva-design/eva';
import { default as theme } from '../theme.json';
import { ApplicationProvider, Layout, Divider, Card, Text } from '@ui-kitten/components';
import { useIsFocused } from "@react-navigation/native";
import { Header } from 'react-native-elements'
const response = {
  statusCode: 200,
  data: {
    imageURI:
      "https://www.eatout.co.za/wp-content/uploads/2014/11/koeksuster-recipe-20Mar13-043451.jpg",
    foodName: "Koeksister",
    foodDesc:
      "A koeksister also spelled koesister is a traditional Afrikaner confectionery made of fried dough infused in syrup or honey. There is also a Cape Malay version of the dish, which is a fried ball of dough that is rolled in desiccated coconut. ",
    location: "Pretoria",
    tags: ["Dessert", "Sweet", "Snack", "Warm", "Donut", "Baked"],

    pairings: [
      {
        id: "1",
        foodName: "Koeksister",
        foodImageURI:
          "https://www.eatout.co.za/wp-content/uploads/2014/11/koeksuster-recipe-20Mar13-043451.jpg",
        drinkName: "Espresso",
        drinkImageURI:
          "https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/beveragedaily.com/news/r-d/aussie-barista-helps-scientists-to-brew-the-perfect-espresso/10795433-1-eng-GB/Aussie-barista-helps-scientists-to-brew-the-perfect-espresso_wrbm_large.jpg",
        pairingDesc:
          "Espresso is a coffee-brewing method of Italian origin, in which a small amount of nearly boiling water is forced under 9–10 bars of pressure through finely-ground coffee beans.",
        tags: ["Hot", "Sweet", "Healthy", "Gluten-Free"],
        upVotes: "68",
        downVotes: "12",

      },
      {
        id: "2",
        foodName: "Koeksister",
        foodImageURI:
          "https://www.eatout.co.za/wp-content/uploads/2014/11/koeksuster-recipe-20Mar13-043451.jpg",
        drinkName: "Iced coffee",
        drinkImageURI:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg/600px-Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg",
        pairingDesc:
          "Iced coffee is a coffee beverage served cold. It may be prepared either by brewing coffee in the normal way and then serving it over ice or in cold milk, or by brewing the coffee cold.",
        tags: ["Hot", "Sweet", "Healthy", "Gluten-Free"],
        upVotes: "59",
        downVotes: "19",
      },
      {
        id: "3",
        foodName: "Koeksister",
        foodImageURI:
          "https://www.eatout.co.za/wp-content/uploads/2014/11/koeksuster-recipe-20Mar13-043451.jpg",
        drinkName: "Iced coffee",
        drinkImageURI:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg/600px-Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg",
        pairingDesc:
          "Iced coffee is a coffee beverage served cold. It may be prepared either by brewing coffee in the normal way and then serving it over ice or in cold milk, or by brewing the coffee cold.",
        drinkImageURI:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg/600px-Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg",
        tags: ["Hot", "Sweet", "Healthy", "Gluten-Free"],
        upVotes: "23",
        downVotes: "8",
      },
      {
        id: "4",
        foodName: "Koeksister",
        foodImageURI:
          "https://www.eatout.co.za/wp-content/uploads/2014/11/koeksuster-recipe-20Mar13-043451.jpg",
        drinkName: "Iced coffee",
        drinkImageURI:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg/600px-Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg",
        pairingDesc:
          "Iced coffee is a coffee beverage served cold. It may be prepared either by brewing coffee in the normal way and then serving it over ice or in cold milk, or by brewing the coffee cold.",
        drinkImageURI:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg/600px-Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg",
        tags: ["Hot", "Sweet", "Healthy", "Gluten-Free"],
        upVotes: "12",
        downVotes: "39",
      },
    ],
  },
};

const HomeScreen = (props) => {
  const viewPairingURL =
    "https://qkvdftfq7b.execute-api.eu-west-1.amazonaws.com/dev/viewpairings";
  const [isLoading, setLoading] = useState(useIsFocused());
  const [data, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [flavourProfile, setFlavourProfile] = useState("None");
  const [sortPairings, setSortPairings] = useState("Trending");
  const [mealType, setMealType] = useState("None");

  useEffect(() => {
    fetch(viewPairingURL)
      .then((response) => response.json())
      .then((json) => setData(json.Data))
      .catch((error) => alert(error))
      .then(setLoading(false));
  });
  const showConfirmDialog = () => {
    return Alert.alert(
      "Add to Favourites",
      "Are you sure you want to Favourite this pairing?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            //setShowBox(false);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };


  const TagBar = () => (
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
          {response.data.tags.map((tag, index) => (
            <View style={styles.tagContainer} key={index}>
              <FontAwesome name="tag" size={16} color="#fff" />
              {/* Keeping outlined icons just incase we want to change to them for consistency overall */}
              {/* The filled icons look better in this case though */}
              {/* <Feather name="tag" size={16} color="#fff" /> */}
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const ModalView = () => (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView} >
            <Text>Flavour Profile</Text>
            <Picker
              flavourProfile={flavourProfile}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => { setFlavourProfile(itemValue); console.log(itemValue) }}
            >
              <Picker.Item label="None" value="None" />
              <Picker.Item label="Sweet" value="Sweet" />
              <Picker.Item label="Salty" value="Salty" />
              <Picker.Item label="Spicy" value="Spicy" />
              <Picker.Item label="Sour" value="Sour" />
            </Picker>
            <Divider />
            <Text>Meal Type</Text>
            <Picker
              mealType={mealType}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => { setMealType(itemValue); console.log(itemValue) }}
            >
              <Picker.Item label="None" value="None" />
              <Picker.Item label="Breakfast" value="Breakfast" />
              <Picker.Item label="Brunch" value="Brunch" />
              <Picker.Item label="Supper" value="Supper" />
              <Picker.Item label="Dessert" value="Dessert" />
            </Picker>
            <Divider />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!isModalVisible)}
            >
              <Text style={styles.textStyle}>close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text >
          <Feather name="filter" size={24} color="white" />
        </Text>
      </Pressable>
    </View>
  );

  const SearchBar = () => (<SearchBar
    placeholder="Search here..."
    onChangeText={this.updateSearch}
    value={search}
  />);

  const ShowTitle = () => (
    <Text style={styles.TextLarge}> {sortPairings} </Text>
  )

  const filterButton = () => (
    <Pressable
      style={[styles.button, styles.buttonOpen]}
      onPress={() => setModalVisible(true)}
    >
      <Text >
        <Feather name="filter" size={24} color="white" />
      </Text>
    </Pressable>

  )
  const searchButton = () => (
    <Pressable
      style={[styles.button, styles.buttonOpen]}
      onPress={() => setModalVisible(true)}
    >
      <Text >
        <Feather name="search" size={24} color="white" />
      </Text>
    </Pressable>
  )

  return (
    <ApplicationProvider  {...eva} theme={{ ...eva.light, ...theme }} style={styles.container}>
      <Header
        statusBarProps={{ elevated: 'true', backgroundColor: "white" }}
        leftComponent={searchButton}
        centerComponent={< ShowTitle />} //sortpairings doesnt show
        containerStyle={{
          backgroundColor: 'white',
        }}
        rightComponent={filterButton} />
      <ScrollView style={styles.scrollView}>
        <View style={{ height: "100%" }}>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!isModalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView} >
                  <Text>Sort Pairings</Text>
                  <Picker
                    sortPairings={sortPairings}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => { setSortPairings(itemValue); console.log(itemValue) }}
                  >
                    <Picker.Item label="Trending" value="Trending" />
                    <Picker.Item label="Most Liked" value="Most Liked" />
                    <Picker.Item label="Newest" value="Newest" />
                  </Picker>
                  <Divider />

                  <Text>Flavour Profile</Text>
                  <Picker
                    flavourProfile={flavourProfile}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => { setFlavourProfile(itemValue); console.log(itemValue) }}
                  >
                    <Picker.Item label="None" value="None" />
                    <Picker.Item label="Sweet" value="Sweet" />
                    <Picker.Item label="Salty" value="Salty" />
                    <Picker.Item label="Spicy" value="Spicy" />
                    <Picker.Item label="Sour" value="Sour" />
                  </Picker>
                  <Divider />
                  <Text>Meal Type</Text>
                  <Picker
                    mealType={mealType}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => { setMealType(itemValue); console.log(itemValue) }}
                  >
                    <Picker.Item label="None" value="None" />
                    <Picker.Item label="Breakfast" value="Breakfast" />
                    <Picker.Item label="Brunch" value="Brunch" />
                    <Picker.Item label="Supper" value="Supper" />
                    <Picker.Item label="Dessert" value="Dessert" />
                  </Picker>
                  <Divider />
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!isModalVisible)}
                  >
                    <Text style={styles.textStyle}>close</Text>
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
                <View>
                  <Card style={styles.cardContainer}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={require("../assets/waffles.jpg")}
                        style={styles.standardImage}
                      />
                      <Image
                        source={require("../assets/milkshake.jpg")}
                        style={styles.standardImage}
                      />
                    </View>
                    <View >
                      <View style={styles.cardText}>
                        <Text>{item.FoodItem}</Text>
                        <Text>{item.DrinkItem}</Text>
                      </View>
                      <View>
                        <Text style={{ textAlign: "center" }}>Pairing descr</Text>
                      </View>
                    </View>

                    <TagBar />
                    <View style={styles.locationBar}>
                      <SimpleLineIcons name="location-pin" size={25} color="white" />
                      <Text style={styles.TextSmallWhite}>Prospect Street, Pretoria, Gauteng </Text>

                    </View>
                    <Divider />
                    <View style={styles.iconsBar}>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ flexDirection: "row", justifyContent: "center", paddingRight: "10%" }}>
                          <Feather name="arrow-down-circle" size={25} color="black" />
                          <Text style={{ paddingLeft: "2%", paddingVertical: "1%" }}>45</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                          <Feather name="arrow-up-circle" size={25} color="black" />
                          <Text style={{ paddingLeft: "2%", paddingVertical: "1%" }}>100</Text>
                        </View>
                      </View>
                      <Pressable onPress={showConfirmDialog}>
                        <Feather name="heart" size={25} color="black" />
                      </Pressable>
                    </View>

                  </Card>
                  <Text></Text>
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
});

export default HomeScreen;




