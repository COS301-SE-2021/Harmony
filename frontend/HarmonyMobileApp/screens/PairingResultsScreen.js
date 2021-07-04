import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import {
  ImageHeaderScrollView,
  TriggeringView,
} from "react-native-image-header-scroll-view";
import { FontAwesome } from "@expo/vector-icons";

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 350;

const response = {
  statusCode: 200,
  data: {
    imageURI:
      "https://www.eatout.co.za/wp-content/uploads/2014/11/koeksuster-recipe-20Mar13-043451.jpg",
    foodItem: "Koeksister",
    foodDesc:
      "A koeksister also spelled koesister is a traditional Afrikaner confectionery made of fried dough infused in syrup or honey. There is also a Cape Malay version of the dish, which is a fried ball of dough that is rolled in desiccated coconut. ",
    location: "Pretoria",
    categories: ["Desert", "Sweet", "Snack"],
  },
};

const PairingResultsScreen = (props) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageHeaderScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        renderHeader={() => (
          <Image
            source={{ uri: response.data.imageURI }}
            style={styles.image}
          />
        )}
      >
        <TriggeringView style={styles.section}>
          <View>
            <Text style={styles.title}>{response.data.foodItem}</Text>
          </View>
        </TriggeringView>

        <View style={[styles.section, styles.sectionLarge]}>
          <Text style={styles.sectionContent}>{response.data.foodDesc}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.categories}>
            {response.data.categories.map((category, index) => (
              <View style={styles.categoryContainer} key={index}>
                <FontAwesome name="tag" size={16} color="#fff" />
                <Text style={styles.category}>{category}</Text>
              </View>
            ))}
          </View>
        </View>
      </ImageHeaderScrollView>
    </View>
  );
};

export default PairingResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get("window").width,
    alignSelf: "stretch",
    resizeMode: "cover",
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: "bold",
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
  sectionLarge: {
    minHeight: 300,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  categoryContainer: {
    flexDirection: "row",
    backgroundColor: "#FF6347",
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 10,
  },
});
