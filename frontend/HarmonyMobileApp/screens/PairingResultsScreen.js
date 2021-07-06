import React, { useRef } from "react";

import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import { Text } from "@ui-kitten/components";
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

const tags = {
  activeIndex: 0,
  carouselItems: [
    {
      title: "Item 1",
      text: "Text 1",
    },
    {
      title: "Item 2",
      text: "Text 2",
    },
    {
      title: "Item 3",
      text: "Text 3",
    },
    {
      title: "Item 4",
      text: "Text 4",
    },
    {
      title: "Item 5",
      text: "Text 5",
    },
  ],
};

const PairingResultsScreen = (props) => {
  const navTitleView = useRef(null);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageHeaderScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        renderHeader={() => (
          <Image
            style={styles.foodImage}
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
            <View
              style={{
                flexDirection: "row",
                left: "35%",
              }}
            >
              <MaterialIcons name="error-outline" size={24} color="red" />
            </View>
          </View>
        </TriggeringView>

        <View style={[styles.section]}>
          <Text style={styles.sectionContent}>{response.data.foodDesc}</Text>
        </View>
        <View style={styles.section}>
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
            width={300}
            height={300}
            shadowColor="#051934"
            text={response.data.recommendedDrink.drinkItem}
            source={{ uri: response.data.recommendedDrink.imageURI }}
            textStyle={styles.imageTextOverlay}
          />
        </View>

        {/* Other alternate drink options */}
        <ScrollView
          style={styles.otherDrinkImage}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
          horizontal={false}
        >
          {response.data.drinkPairings.map((drink, index) => (
            <View key={index}>
              <ImagedCarouselCard
                width={150}
                height={150}
                shadowColor="#051934"
                text={drink.drinkItem}
                source={{ uri: drink.imageURI }}
                style={styles.drinkContainer}
                textStyle={styles.imageTextOverlay}
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
  foodImage: {
    height: MAX_HEIGHT,
    width: Dimensions.get("window").width,
    alignSelf: "stretch",
    resizeMode: "cover",
  },
  otherDrinkImage: {
    marginHorizontal: 16,
    marginTop: 30,
    width: "100%",
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
  sectionContent: {
    fontSize: 16,
    textAlign: "justify",
  },
  tagsContainer: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    flexWrap: "wrap",
  },
  tagContainer: {
    flexDirection: "row",
    backgroundColor: "#FF6347",
    borderRadius: 20,
    margin: 5,
    padding: 10,
    paddingHorizontal: 15,
  },
  tagText: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 10,
  },
  drinkContainer: {
    backgroundColor: "#FF6347",
    borderRadius: 20,
    margin: 5,
    padding: 10,
    paddingHorizontal: 15,
    height: 150,
    width: 150,
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
  imageTextOverlay: {
    fontSize: 18,
    color: "white",
    marginLeft: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
