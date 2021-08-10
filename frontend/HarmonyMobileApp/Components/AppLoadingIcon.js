import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
export default function AppLoadingIcon() {
  return (
    // Container needed to overlay full screen
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        {/* 
        centerContainer needed to wrap both the gif and the text
        the gif edges cannot be rounded so I wrapped it in a view and rounded the View instead
        */}
        <Image
          style={styles.loadingIcon}
          source={require("../assets/food-animation-white-background.gif")}
        />
        <Text style={{ alignSelf: "center" }}>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#ffff",
    backgroundColor: "#F5FCFF88",
  },
  loadingIcon: {
    width: 100,
    height: 100,
  },
  centerContainer: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
