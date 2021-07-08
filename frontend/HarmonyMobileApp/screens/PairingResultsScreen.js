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

import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import ImagedCarouselCard from "react-native-imaged-carousel-card";

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 300;

const { height } = Dimensions.get("window");
const ITEM_HEIGHT = height * 0.5;

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

const PairingResultsScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

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
            <Text style={styles.title}>Feedback </Text>
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

  const RecommendedDrink = () => (
    <View style={[styles.section]}>
      <Text style={styles.subtitle}>Recommended:</Text>
      {/* Main recommendedDrink */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate("Results", {
            screen: "DrinkDetailsScreen",
            params: { item: response.data.recommendedDrink },
          });
        }}
      >
        <SharedElement id={response.data.recommendedDrink.id}>
          {/* <ImagedCarouselCard
            width={300} //Width must be defined here, else the overlay text will overflow out of the container
            height={300}
            text={response.data.recommendedDrink.drinkName}
            textStyle={styles.cardTextOverlay}
            source={{ uri: response.data.recommendedDrink.imageURI }}
            style={styles.drinkCard}
          /> */}
          <Image
            source={{ uri: response.data.recommendedDrink.imageURI }}
            style={{
              width: 300,
              height: 300,
              borderRadius: 20,
            }}
            resizeMode="cover"
          />
        </SharedElement>

        <SharedElement id={response.data.recommendedDrink.drinkName}>
          <Text style={styles.title}>
            {response.data.recommendedDrink.drinkName}
          </Text>
        </SharedElement>
      </TouchableOpacity>
    </View>
  );

  const OtherDrinks = () => (
    <ScrollView
      style={styles.otherDrinkCardsContainer}
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
      }}
      horizontal={false}
    >
      {response.data.drinkPairings.map((drink, index) => (
        <View key={index}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navigation.navigate("Results", {
                screen: "DrinkDetailsScreen",
                params: { item: drink },
              });
            }}
          >
            {/* <ImagedCarouselCard
              width={150} //Width must be defined here, else the overlay text will overflow out of the container
              height={150}
              text={drink.drinkName}
              textStyle={styles.cardTextOverlay}
              source={{ uri: drink.imageURI }}
              style={styles.drinkCard}
            /> */}

            <SharedElement id={drink.id}>
              <Image
                source={{ uri: drink.imageURI }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 20,
                }}
                resizeMode="cover"
              />
            </SharedElement>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const FoodDescription = () => (
    <View style={[styles.section]}>
      <Text style={styles.sectionText}>{response.data.foodDesc}</Text>
    </View>
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
      <Text style={styles.title}>{response.data.foodName}</Text>
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

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageHeaderScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        renderHeader={() => (
          <Image
            style={styles.foodCard}
            source={{ uri: response.data.imageURI }}
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
    alignSelf: "center",
    paddingBottom: 10,
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
    elevation: 4, //gives shadow/3D effect
  },
  tagText: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 10, //Space between tag icon and text
  },
  drinkCard: {
    //Card style for drinks
    //Width and Height must be set inline for ImageCarousel cards
    borderRadius: 20,
    margin: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  otherDrinkCardsContainer: {
    marginHorizontal: 16,
    marginTop: 10,
    width: "100%",
  },
  cardTextOverlay: {
    fontSize: 18,
    color: "white",
    marginLeft: 16,
    marginRight: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
