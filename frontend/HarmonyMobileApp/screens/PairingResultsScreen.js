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

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 350;

const PairingResultsScreen = (props) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageHeaderScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        renderHeader={() => (
          <Image
            source={{ uri: "https://reactnative.dev/docs/assets/p_cat2.png" }}
            style={styles.image}
          />
        )}
      >
        <TriggeringView>
          <View>
            <Text style={styles.title}>FOODNAME</Text>
          </View>
        </TriggeringView>
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
});
