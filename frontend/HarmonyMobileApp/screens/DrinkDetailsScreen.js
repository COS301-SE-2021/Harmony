import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Text,
} from "react-native";

import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const MAX_HEIGHT = 300;

// const DrinkDetailsScreen = ({ navigation, props }) => {
const DrinkDetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const buttonRef = React.useRef();

  const CloseButton = () => (
    <Animatable.View
      ref={buttonRef}
      animation="fadeIn"
      duration={600}
      delay={300}
      style={[StyleSheet.absoluteFillObject]}
    >
      <MaterialCommunityIcons
        name="close"
        size={28}
        color="#fff"
        style={{
          position: "absolute",
          top: 40,
          right: 20,
          zIndex: 2,
        }}
        onPress={() => {
          buttonRef.current.fadeOut(100).then(() => {
            navigation.goBack();
          });
        }}
      />
    </Animatable.View>
  );

  const TitleBar = () => (
    <SharedElement id={item.drinkName}>
      <View
        style={[
          styles.section,
          {
            flexDirection: "row",
            justifyContent: "center",
          },
        ]}
      >
        <Text style={styles.title}>{item.drinkName}</Text>
      </View>
    </SharedElement>
  );

  const FoodDescription = () => (
    <View style={[styles.section]}>
      <Text style={styles.sectionText}>{item.drinkDesc}</Text>
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
          {item.tags.map((tag, index) => (
            <View style={styles.tagContainer} key={index}>
              <FontAwesome name="tag" size={16} color="#fff" />
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SharedElement id={item.id}>
        <Image
          source={{ uri: item.imageURI }}
          style={{
            width: "100%",
            height: MAX_HEIGHT,
          }}
          resizeMode="cover"
        />
      </SharedElement>

      <CloseButton />
      <TitleBar />
      <FoodDescription />
      <TagBar />
    </View>
  );
};
DrinkDetailsScreen.sharedElements = (route) => {
  const { item } = route.params;
  return [
    {
      id: item.id,
      animation: "move",
      resize: "clip",
    },
    {
      id: item.drinkName,
      animation: "fade",
      resize: "clip",
    },
  ];
};

export default DrinkDetailsScreen;

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
