import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text } from "@ui-kitten/components";
import Modal from "react-native-modal";
import { ImageHeaderScrollView } from "react-native-image-header-scroll-view";
import { SharedElement } from "react-navigation-shared-element";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";

import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 300;
{
  /*
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
      recommendedDrink: {
        id: "99",
        drinkName: "Tea",
        drinkDesc:
          "Tea is an aromatic beverage prepared by pouring hot or boiling water over cured or fresh leaves of Camellia sinensis, an evergreen shrub native to China and East Asia. ",
        imageURI:
          "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tea-cup-bag-high-res-stock-photography-1570544677.jpg?resize=768:*",
        tags: ["Hot", "Sweet", "Healthy", "Gluten-Free"],
      },
      drinkPairings: [
        {
          id: "1",
          drinkName: "Espresso",
          drinkDesc:
            "Espresso is a coffee-brewing method of Italian origin, in which a small amount of nearly boiling water is forced under 9–10 bars of pressure through finely-ground coffee beans.",
          imageURI:
            "https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/beveragedaily.com/news/r-d/aussie-barista-helps-scientists-to-brew-the-perfect-espresso/10795433-1-eng-GB/Aussie-barista-helps-scientists-to-brew-the-perfect-espresso_wrbm_large.jpg",
          tags: ["Hot", "Sweet", "Healthy", "Gluten-Free"],
        },
        {
          id: "2",
          drinkName: "Iced coffee",
          drinkDesc:
            "Iced coffee is a coffee beverage served cold. It may be prepared either by brewing coffee in the normal way and then serving it over ice or in cold milk, or by brewing the coffee cold.",
          imageURI:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg/600px-Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg",
          tags: ["Hot", "Sweet", "Healthy", "Gluten-Free"],
        },
        {
          id: "3",
          drinkName: "Iced coffee",
          drinkDesc:
            "Iced coffee is a coffee beverage served cold. It may be prepared either by brewing coffee in the normal way and then serving it over ice or in cold milk, or by brewing the coffee cold.",
          imageURI:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg/600px-Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg",
          tags: ["Hot", "Sweet", "Healthy", "Gluten-Free"],
        },
        {
          id: "4",
          drinkName: "Iced coffee",
          drinkDesc:
            "Iced coffee is a coffee beverage served cold. It may be prepared either by brewing coffee in the normal way and then serving it over ice or in cold milk, or by brewing the coffee cold.",
          imageURI:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg/600px-Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg",
          tags: ["Hot", "Sweet", "Healthy", "Gluten-Free"],
        },
      ],
    },
  };
  */
}
const response = {
  statusCode: 200,
  data: [
    {
      DrinkImage:
        "https://imagepairings.s3.eu-west-1.amazonaws.com/Drinks/Fanta.jpg",
      FoodDesc:
        "A hotdog is a food consisting of a grilled or steamed sausage served in the slit of a partially sliced bun.",
      FoodTags: ["Roll", "Meat", "Grilled"],
      Location: "Everywhere",
      FoodItem: "Hotdog",
      DrinkTags: ["Sweet", "Cold", "Soda"],
      PID: "ycdyitdfucyr6556",
      DrinkDesc: "Fanta is a brand of fruit-flavored carbonated soft drinks.",
      DrinkItem: "Fanta",
      UID: "u9",
      FoodImage:
        "https://imagepairings.s3.eu-west-1.amazonaws.com/Foods/Hot+Dog.jpg",
      Rating: "4.5",
    },
    {
      DrinkImage:
        "https://imagepairings.s3.eu-west-1.amazonaws.com/Drinks/Coke.jpg",
      FoodDesc:
        "A hot dog is a food consisting of a grilled or steamed sausage served in the slit of a partially sliced bun.",
      FoodTags: ["Roll", "Meat", "Grilled"],
      Location: "Everywhere",
      FoodItem: "Hotdog",
      DrinkTags: ["Sweet", "Cold", "Soda"],
      PID: "ycdyrtdfucyr6556",
      DrinkDesc:
        "Coca-Cola, or Coke, is a carbonated soft drink manufactured by The Coca-Cola Company.",
      DrinkItem: "Coke",
      UID: "u9",
      FoodImage:
        "https://imagepairings.s3.eu-west-1.amazonaws.com/Foods/Hot+Dog.jpg",
      Rating: "4.5",
    },
    {
      DrinkImage:
        "https://imagepairings.s3.eu-west-1.amazonaws.com/Drinks/Milkshake.jpg",
      FoodDesc:
        "A hot dog is a food consisting of a grilled or steamed sausage served in the slit of a partially sliced bun.",
      FoodTags: ["Roll", "Meat", "Grilled"],
      Location: "Everywhere",
      FoodItem: "Hotdog",
      DrinkTags: ["Sweet", "Cold", "Milk"],
      PID: "ycdyrtdfucir6556",
      DrinkDesc:
        "A milkshake is a sweet drink made by blending milk, ice cream, and flavorings or sweeteners such as butterscotch, caramel sauce, chocolate syrup, fruit syrup, or whole fruit into a thick, sweet, cold mixture.",
      DrinkItem: "Milkshake",
      UID: "u9",
      FoodImage:
        "https://imagepairings.s3.eu-west-1.amazonaws.com/Foods/Hot+Dog.jpg",
      Rating: "4.5",
    },
  ],
};
const PairingResultsScreen = ({ navigation, route }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const item = route.params;
  console.log(item);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const FeedbackModal = () => (
    <Modal
      isVisible={isModalVisible}
      onBackButtonPress={toggleModal}
      onBackdropPress={toggleModal}
      animationIn={"slideInRight"}
      animationOut={"slideOutRight"}
      swipeDirection={["up", "left", "right", "down"]}
      onSwipeComplete={toggleModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
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
          <View style={[styles.modalHeaderSection]}>
            <Text style={styles.title}>Help us improve </Text>
          </View>
          <Text style={styles.modalText}>
            Is the food correctly identified?
          </Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonIncorrect]}
              onPress={() => setModalVisible(!isModalVisible)}
            >
              {/* Keeping outlined icons just incase we want to change to them for consistency overall */}
              {/* The filled icons look better in this case though */}
              {/* <MaterialIcons
                    name="thumb-down-off-alt"
                    size={40}
                    color="white"
                  /> */}
              <MaterialIcons name="thumb-down" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonCorrect]}
              onPress={() => setModalVisible(!isModalVisible)}
            >
              {/* Keeping outlined icons just incase we want to change to them for consistency overall */}
              {/* The filled icons look better in this case though */}
              {/* <MaterialIcons
                    name="thumb-up-off-alt"
                    size={40}
                    color="white"
                  /> */}
              <MaterialIcons name="thumb-up" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const TitleBar = () => (
    <View
      style={[
        styles.section,
        {
          flexDirection: "row",
          justifyContent: "center",
        },
      ]}
    >
      <Text style={styles.title}>{response.data[0].FoodItem}</Text>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          left: "35%",
        }}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="error-outline" size={24} color="red" />
        <FeedbackModal />
      </TouchableOpacity>
    </View>
  );

  const FoodDescription = () => (
    <View style={[styles.section]}>
      <Text style={styles.sectionText}>{response.data[0].FoodDesc}</Text>
    </View>
  );

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
          {response.data[0].FoodTags.map((tag, index) => (
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

  const RecommendedDrink = () => (
    <View style={[styles.section, styles.centeredView]}>
      <Text style={styles.subtitle}>Suggested for you</Text>
      {/* Main recommendedDrink */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("Results", {
            screen: "DrinkDetailsScreen",
            params: { item: response.data[0] },
          });
        }}
      >
        {/* <SharedElement id={response.data.recommendedDrink.id}> */}
        {/* <SharedElement id={response.data[0].drinkId}> */}
        <SharedElement id={response.data[0].PID}>
          {/* Temp ID used above as an ID was not provided by the API yet */}
          <Image
            source={{ uri: response.data[0].DrinkImage }}
            style={[styles.drinkCard, styles.bigDrinkCard]}
          />
        </SharedElement>
        <Animatable.View
          animation="fadeIn"
          delay={200}
          style={[styles.cardBackgroundOverlay, { width: 300 }]}
        >
          {/* <SharedElement id={response.data.recommendedDrink.drinkName}> */}
          <Text style={[styles.cardTextOverlay]}>
            {response.data[0].DrinkItem}
          </Text>
          {/* </SharedElement> */}
        </Animatable.View>
      </TouchableOpacity>
    </View>
  );

  const OtherDrinks = () => (
    <View style={[styles.section, styles.centeredView]}>
      <Text style={styles.subtitle}>You might also like</Text>

      <ScrollView
        style={styles.otherDrinkCardsContainer}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
        horizontal={false}
      >
        {/* {response.data.drinkPairings.map((drink, index) => ( */}
        {response.data.slice(1).map((pairing, index) => (
          //.slice(1) is used to skip the first element of the data
          <View key={index}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("Results", {
                  screen: "DrinkDetailsScreen",
                  params: { item: pairing },
                });
              }}
            >
              <SharedElement id={pairing.PID}>
                <Image
                  source={{ uri: pairing.DrinkImage }}
                  style={[styles.drinkCard, styles.smallDrinkCard]}
                />
              </SharedElement>
              <View style={[styles.cardBackgroundOverlay, { width: 150 }]}>
                {/* <SharedElement id={response.data.recommendedDrink.drinkName}> */}
                <Text style={[styles.cardTextOverlay]}>
                  {pairing.DrinkItem}
                </Text>
                {/* </SharedElement> */}
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  //Somehow the this line affects the animation
  //Each time the screen comes into focus, the animations
  //for the drink titles animate
  //however there are side effects such as image flickering
  //and transitioning too fast making the whole transition
  //look very botched
  // const isFocused = useIsFocused();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageHeaderScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        renderHeader={() => (
          <Image
            style={styles.foodCard}
            source={{ uri: response.data[0].FoodImage }}
          />
        )}
      >
        <TitleBar />
        <FoodDescription />
        <TagBar />
        <RecommendedDrink />
        <OtherDrinks />
      </ImageHeaderScrollView>
    </View>
  );
};
export default PairingResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  foodCard: {
    height: MAX_HEIGHT,
    width: Dimensions.get("window").width,
    alignSelf: "stretch",
    resizeMode: "cover",
  },
  title: {
    fontSize: 22,
    alignSelf: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    padding: 10,
    // borderWidth: 1,
    borderRadius: 20,
    width: "100%",
    // backgroundColor: "#EAEAEA",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    backgroundColor: "white",
  },
  sectionText: {
    fontSize: 16,
    textAlign: "center",
  },
  tagsSection: {
    //Different from section because theres no padding on the right or left
    //We do this so theres no visible cutoff as you scroll left or right
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    backgroundColor: "white",
  },
  rowContainer: {
    //Container to hold all tags
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    flexWrap: "wrap",
  },
  tagContainer: {
    //Container of individual tag
    flexDirection: "row", //Needed to keep the tag icon and text in one line
    backgroundColor: "#FF6347",
    borderRadius: 20,
    margin: 5, //Space between tags
    padding: 10, //Space around innner tag
    elevation: 2, //gives shadow/3D effect
  },
  tagText: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 10, //Space between tag icon and text
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
  otherDrinkCardsContainer: {
    marginHorizontal: 16,
    marginTop: 10,
    width: "100%",
  },
  cardTextOverlay: {
    fontSize: 20,
    // color: "white",
    color: "black",
    marginHorizontal: 10,
    fontWeight: "600",
    textAlign: "center",
    // backgroundColor: "rgba(0,0,0,0.3)",
  },
  cardBackgroundOverlay: {
    // position: "absolute",
    height: 50,
    left: 5,
    bottom: 5,
    // backgroundColor: "rgba(0,0,0,0.1)",
    // backgroundColor: "#4F6D7A",
    // backgroundColor: "#DD6E42",
    // backgroundColor: "#FF6347",
    // backgroundColor: "#E8DAB2",
    // backgroundColor: "#C0D6DF",
    backgroundColor: "#EAEAEA",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // borderWidth: 1,
    elevation: 2,

    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 4,
    margin: 5,
  },
  buttonCorrect: {
    backgroundColor: "#56a211",
  },
  buttonIncorrect: {
    backgroundColor: "#e9430f",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 5,
  },
  modalHeaderSection: {
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    backgroundColor: "white",
  },
  modalText: {
    paddingVertical: 10,
    fontSize: 20,
    textAlign: "center",
  },
});
