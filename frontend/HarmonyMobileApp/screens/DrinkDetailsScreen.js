import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";

import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const { height } = Dimensions.get("window");
const ITEM_HEIGHT = height * 0.5;

// const DrinkDetailsScreen = ({ navigation, props }) => {
const DrinkDetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const buttonRef = React.useRef();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SharedElement id={"item.imageURI"}>
        <Image
          source={{ uri: item.imageURI }}
          style={{
            width: "100%",
            height: ITEM_HEIGHT,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
          resizeMode="cover"
        />
      </SharedElement>
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
      <ScrollView
        indicatorStyle="white"
        style={{
          paddingHorizontal: 20,
          backgroundColor: "#0f0f0f",
        }}
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#fff",
            lineHeight: 24,
            marginBottom: 4,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "#fff",
            lineHeight: 24,
            marginBottom: 4,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </ScrollView>
    </View>
  );
};
DrinkDetailsScreen.sharedElements = (route) => {
  const { item } = route.params;
  return [
    {
      id: "item.imageURI",
      animation: "move",
      resize: "clip",
    },
  ];
};

export default DrinkDetailsScreen;
