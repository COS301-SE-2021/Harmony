import React, { useRef, useState } from "react";

import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { Text, Icon } from "@ui-kitten/components";

import {
  ImageHeaderScrollView,
  TriggeringView,
} from "react-native-image-header-scroll-view";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

import ImagedCarouselCard from "react-native-imaged-carousel-card";
import * as Animatable from "react-native-animatable";

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 300;

const response = {
  statusCode: 200,
  data: {
    imageURI:
      "https://www.eatout.co.za/wp-content/uploads/2014/11/koeksuster-recipe-20Mar13-043451.jpg",
    foodItem: "Koeksister",
    foodDesc:
      "A koeksister also spelled koesister is a traditional Afrikaner confectionery made of fried dough infused in syrup or honey. There is also a Cape Malay version of the dish, which is a fried ball of dough that is rolled in desiccated coconut. ",
    location: "Pretoria",
    tags: ["Dessert", "Sweet", "Snack", "Dessert", "Sweet", "Snack"],
    recommendedDrink: {
      drinkItem: "Tea",
      drinkDesc:
        "Tea is an aromatic beverage prepared by pouring hot or boiling water over cured or fresh leaves of Camellia sinensis, an evergreen shrub native to China and East Asia. ",
      imageURI:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tea-cup-bag-high-res-stock-photography-1570544677.jpg?resize=768:*",
    },
    drinkPairings: [
      {
        id: "1",
        drinkItem: "Espresso",
        drinkDesc:
          "Espresso is a coffee-brewing method of Italian origin, in which a small amount of nearly boiling water is forced under 9–10 bars of pressure through finely-ground coffee beans.",
        imageURI:
          "https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/beveragedaily.com/news/r-d/aussie-barista-helps-scientists-to-brew-the-perfect-espresso/10795433-1-eng-GB/Aussie-barista-helps-scientists-to-brew-the-perfect-espresso_wrbm_large.jpg",
      },
      {
        id: "2",
        drinkItem: "Iced coffee",
        drinkDesc:
          "Iced coffee is a coffee beverage served cold. It may be prepared either by brewing coffee in the normal way and then serving it over ice or in cold milk, or by brewing the coffee cold.",
        imageURI:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg/600px-Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg",
      },
      {
        id: "3",
        drinkItem: "Iced coffee",
        drinkDesc:
          "Iced coffee is a coffee beverage served cold. It may be prepared either by brewing coffee in the normal way and then serving it over ice or in cold milk, or by brewing the coffee cold.",
        imageURI:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg/600px-Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg",
      },
      {
        id: "4",
        drinkItem: "Iced coffee",
        drinkDesc:
          "Iced coffee is a coffee beverage served cold. It may be prepared either by brewing coffee in the normal way and then serving it over ice or in cold milk, or by brewing the coffee cold.",
        imageURI:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg/600px-Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg",
      },
    ],
  },
};

const PairingResultsScreen = (props) => {
  const navTitleView = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

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
        renderFixedForeground={() => (
          <Animatable.View style={styles.navTitleView} ref={navTitleView}>
            <Text style={styles.navTitle}>{response.data.foodItem}</Text>
          </Animatable.View>
        )}
      >
        <TriggeringView
          style={styles.section}
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(100)}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={styles.title}>{response.data.foodItem}</Text>
            {/* <TouchableOpacity
              style={{
                flexDirection: "row",
                left: "35%",
              }}
            >
              <MaterialIcons name="error-outline" size={24} color="red" />
            </TouchableOpacity> */}

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    Is the food correctly identified?
                  </Text>
                  <View style={styles.modalButtonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Icon
                        style={styles.icon}
                        fill="#fff"
                        name="close-circle-outline"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Icon
                        style={styles.icon}
                        fill="#fff"
                        name="checkmark-circle-2-outline"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                left: "35%",
              }}
              onPress={() => setModalVisible(true)}
            >
              <MaterialIcons name="error-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </TriggeringView>

        <View style={[styles.section]}>
          <Text style={styles.sectionText}>{response.data.foodDesc}</Text>
        </View>
        <View style={styles.tagsSection}>
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          >
            <View style={styles.tagsContainer}>
              {response.data.tags.map((tag, index) => (
                <View style={styles.tagContainer} key={index}>
                  <FontAwesome name="tag" size={16} color="#fff" />
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={[styles.section]}>
          <Text style={styles.subtitle}>Recommended:</Text>
          {/* Main recommendedDrink */}
          <ImagedCarouselCard
            text={response.data.recommendedDrink.drinkItem}
            textStyle={styles.cardTextOverlay}
            source={{ uri: response.data.recommendedDrink.imageURI }}
            style={styles.largeDrinkCard}
          />
        </View>

        {/* Other alternate drink options */}
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
              <ImagedCarouselCard
                width={150} //Width must be defined here, else the overlay text will overflow out of the container
                height={150}
                text={drink.drinkItem}
                textStyle={styles.cardTextOverlay}
                source={{ uri: drink.imageURI }}
                style={styles.smallDrinkCard}
              />
            </View>
          ))}
        </ScrollView>
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
  otherDrinkCardsContainer: {
    marginHorizontal: 16,
    marginTop: 10,
    width: "100%",
    backgroundColor: "red",
  },
  title: {
    fontSize: 20,
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
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    backgroundColor: "white",
  },
  tagsContainer: {
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
  smallDrinkCard: {
    //Card style for smaller cards falling into the other section
    borderRadius: 20,
    margin: 5,
    padding: 10,
    height: 150,
    width: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  largeDrinkCard: {
    //Card style for main recommended drink card

    borderRadius: 20,
    margin: 5,
    padding: 10,
    paddingHorizontal: 15,
    height: 300,
    width: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 40 : 5,
    opacity: 0,
  },
  navTitle: {
    color: "white",
    fontSize: 18,
    backgroundColor: "transparent",
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
    padding: 35,
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
  modalButtonContainer: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    flexWrap: "wrap",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    alignSelf: "center",
  },
  icon: {
    width: 60,
    height: 60,
  },
});
