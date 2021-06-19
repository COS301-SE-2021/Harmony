import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import styles from "../styles";

const ViewIndividualItemsScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={(styles.container, { flex: 0, paddingTop: 20 })}>
        <View style={styles.backgroundBarShowLatest}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.TextLarge}> Items</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View
        style={
          (styles.container,
          { justifyContent: "center", flexDirection: "row", marginTop: 25 })
        }
      >
        <View>
          <Image
            source={require("../assets/waffles.jpg")}
            style={styles.regularImage}
          />
          <Text style={styles.TextMedium}> Waffles </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Image
            source={require("../assets/plus.png")}
            style={styles.smallImage}
          />
        </View>
        <View>
          <Image
            source={require("../assets/milkshake.jpg")}
            style={styles.regularImage}
          />
          <Text style={styles.TextSmall}> A Milkshake </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewIndividualItemsScreen;
