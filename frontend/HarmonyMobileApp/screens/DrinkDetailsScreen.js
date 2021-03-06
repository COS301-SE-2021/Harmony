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

const MAX_HEIGHT = 400;

const DrinkDetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  // console.log(item);

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
    <SharedElement id={item.DrinkItem}>
      <View
        style={[
          styles.section,
          {
            flexDirection: "row",
            justifyContent: "center",
          },
        ]}
      >
        <Text style={styles.title}>{item.DrinkItem}</Text>
      </View>
    </SharedElement>
  );

  const FoodDescription = () => (
    <View style={[styles.section]}>
      <Text style={styles.sectionText}>{item.DrinkDesc}</Text>
    </View>
  );

  const TagBar = () => (
    <View style={styles.tagsSection}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginLeft: "10%",
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <View style={styles.rowContainer}>
          {item.DrinkTags.map((tag, index) => (
            <View style={styles.tagContainer} key={index}>
              {/* <FontAwesome name="tag" size={16} color="#fff" /> */}
              <MaterialCommunityIcons
                name="cup"
                size={16}
                color="#fff"
              />
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <ScrollView
      style={styles.otherDrinkCardsContainer}
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
      }}
      horizontal={false}
    >
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <SharedElement id={item.DrinkID}>
          <Image
            source={{ uri: item.DrinkImage }}
            style={{
              width: "100%",
              height: MAX_HEIGHT,
              // height: "70%",
            }}
            resizeMode="cover"
          />
        </SharedElement>

        <CloseButton />
        <TitleBar />
        <FoodDescription />
        <TagBar />
      </View>
    </ScrollView>
  );
};
DrinkDetailsScreen.sharedElements = (route) => {
  const { item } = route.params;
  return [
    {
      id: item.DrinkID,
      animation: "move",
      resize: "clip",
    },
    {
      id: item.DrinkItem,
      animation: "fade",
      resize: "clip",
    },
  ];
};

export default DrinkDetailsScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    alignSelf: "center",
    fontWeight: "bold",
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
    backgroundColor: "#1FBFBA",
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
});
