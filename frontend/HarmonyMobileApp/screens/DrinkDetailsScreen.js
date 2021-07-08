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
import ImagedCarouselCard from "react-native-imaged-carousel-card";

const { height } = Dimensions.get("window");
const ITEM_HEIGHT = height * 0.5;

// const DrinkDetailsScreen = ({ navigation, props }) => {
const DrinkDetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const buttonRef = React.useRef();

  return (
    // <View style={{ flex: 1, backgroundColor: "red" }}>
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <View> */}
      {/* <SharedElement id={"item.imageURI"}> */}
      {/* <SharedElement id={`item.${item.id}.imageURI`}> */}
      <SharedElement id={item.id}>
        <Image
          source={{ uri: item.imageURI }}
          style={{
            width: "100%",
            height: ITEM_HEIGHT,
          }}
          resizeMode="cover"
        />

        {/* <ImagedCarouselCard
          width={300} //Width must be defined here, else the overlay text will overflow out of the container
          height={300}
          text={"Tea"}
          textStyle={styles.cardTextOverlay}
          source={{ uri: item.imageURI }}
          style={styles.drinkCard}
        /> */}
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
    </View>
  );
};
DrinkDetailsScreen.sharedElements = (route) => {
  const { item } = route.params;
  return [
    {
      // id: "item.imageURI",
      // id: `item.${item.id}.imageURI`,
      id: item.id,
      animation: "move",
      resize: "clip",
    },
  ];
};

export default DrinkDetailsScreen;
