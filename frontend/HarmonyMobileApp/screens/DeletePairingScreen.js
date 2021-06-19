import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import {
  FontAwesome,
  AntDesign,
  MaterialIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";

import styles from "../styles";

const DeletePairingScreen = (props) => {
  return (
    <SafeAreaView style={personalStyles.container}>
      <View style={{ paddingBottom: "2%", paddingRight: "0.5%" }}>
        <ScrollView style={personalStyles.scrollView}>
          <View style={{ paddingTop: "0%" }}>
            <View style={styles.backgroundBarShowLatest}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ justifyContent: "center" }}>
                  <Text style={styles.TextLarge}> Delete Pairing </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.backgroundBarShowLatest}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.TextMedium}> Waffles </Text>
              <View style={{ justifyContent: "center" }}>
                <Image
                  source={require("../assets/plus.png")}
                  style={styles.smallImage}
                />
              </View>
              <Text style={styles.TextMedium}> Milkshake </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ justifyContent: "center" }}>
                <Image
                  source={require("../assets/location.png")}
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                />
              </View>
              <View>
                <Text style={styles.TextSmall}>
                  {" "}
                  Waffle House, Ramsgate, South Coast
                </Text>
              </View>
            </View>
            <TouchableOpacity style={personalStyles.addToFavouriteBtn}>
              <AntDesign name="minuscircleo" size={60} color="red" />
            </TouchableOpacity>
          </View>
          <View style={styles.backgroundBarShowLatest}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.TextMedium}> Burgers </Text>
              <View style={{ justifyContent: "center" }}>
                <Image
                  source={require("../assets/plus.png")}
                  style={styles.smallImage}
                />
              </View>
              <Text style={styles.TextMedium}> Coke </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ justifyContent: "center" }}>
                <Image
                  source={require("../assets/location.png")}
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                />
              </View>
              <View>
                <Text style={styles.TextSmall}>
                  {" "}
                  Rocomamas, Gateway, Umhlanga
                </Text>
              </View>
            </View>
            <TouchableOpacity style={personalStyles.addToFavouriteBtn}>
              <AntDesign name="minuscircleo" size={60} color="red" />
            </TouchableOpacity>
          </View>
          <View style={styles.backgroundBarShowLatest}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.TextMedium}> French Toast </Text>
              <View style={{ justifyContent: "center" }}>
                <Image
                  source={require("../assets/plus.png")}
                  style={styles.smallImage}
                />
              </View>
              <Text style={styles.TextMedium}> Coffee </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ justifyContent: "center" }}>
                <Image
                  source={require("../assets/location.png")}
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                />
              </View>
              <View>
                <Text style={styles.TextSmall}> 1855, Lynnwood, Pretoria</Text>
              </View>
            </View>
            <TouchableOpacity style={personalStyles.addToFavouriteBtn}>
              <AntDesign name="minuscircleo" size={60} color="red" />
            </TouchableOpacity>
          </View>
          <View style={styles.backgroundBarShowLatest}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.TextMedium}> Bunny Chow </Text>
              <View style={{ justifyContent: "center" }}>
                <Image
                  source={require("../assets/plus.png")}
                  style={styles.smallImage}
                />
              </View>
              <Text style={styles.TextMedium}> Coke </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ justifyContent: "center" }}>
                <Image
                  source={require("../assets/location.png")}
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                />
              </View>
              <View>
                <Text style={styles.TextSmall}>
                  {" "}
                  4 Chilli, Garsfontein, Pretoria
                </Text>
              </View>
            </View>
            <TouchableOpacity style={personalStyles.addToFavouriteBtn}>
              <AntDesign name="minuscircleo" size={60} color="red" />
            </TouchableOpacity>
          </View>
          <View style={styles.backgroundBarShowLatest}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.TextMedium}> Koeksister </Text>
              <View style={{ justifyContent: "center" }}>
                <Image
                  source={require("../assets/plus.png")}
                  style={styles.smallImage}
                />
              </View>
              <Text style={styles.TextMedium}> Tea </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ justifyContent: "center" }}>
                <Image
                  source={require("../assets/location.png")}
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                />
              </View>
              <View>
                <Text style={styles.TextSmall}>
                  {" "}
                  Bakehouse, HazelWood, Pretoria
                </Text>
              </View>
            </View>
            <TouchableOpacity style={personalStyles.addToFavouriteBtn}>
              <AntDesign name="minuscircleo" size={60} color="red" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const personalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default DeletePairingScreen;
