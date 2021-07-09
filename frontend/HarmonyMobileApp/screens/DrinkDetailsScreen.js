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
});
