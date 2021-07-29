import React from "react";

import { View, StyleSheet, ActivityIndicator } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

export default function AppLoadingIcon() {
  return (
    <View style={styles.loadingIcon}>
      <ActivityIndicator size={80} color="tomato" />
    </View>
  );
  // return (
  //   <AnimatedLoader
  //     visible={isLoading}
  //     overlayColor="rgba(255,255,255,0.75)"
  //     source={require("../assets/lottieloader2.json")}
  //     animationStyle={styles.lottie}
  //     speed={1}
  //   ></AnimatedLoader>
  // );
}

const styles = StyleSheet.create({
  loadingIcon: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF88",
  },
  lottie: {
    width: 100,
    height: 100,
  },
});
