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
  Alert,
} from "react-native";
import styles from "../styles";

const ShowLatestPairingsScreen = (props) => {
  const showConfirmDialog = () => {
    return Alert.alert(
      "Add to Favourites",
      "Are you sure you want to Favourite this pairing?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            //setShowBox(false);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={personalStyles.container}>
      <ScrollView style={personalStyles.scrollView}>
        <View style={styles.backgroundBarShowLatest}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.TextLarge}> Recent Pairings </Text>
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
            <Text style={styles.TextMedium}> A Milkshake </Text>
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

          <TouchableOpacity
            style={personalStyles.addToFavouriteBtn}
            onPress={() => showConfirmDialog()}
          >
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("../assets/favourites.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </View>
            <View>
              <Text style={styles.TextSmall}> Add to favourites</Text>
            </View>
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
          <TouchableOpacity
            style={personalStyles.addToFavouriteBtn}
            onPress={() => showConfirmDialog()}
          >
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("../assets/favourites.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </View>
            <View>
              <Text style={styles.TextSmall}> Add to favourites</Text>
            </View>
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
          <TouchableOpacity
            style={personalStyles.addToFavouriteBtn}
            onPress={() => showConfirmDialog()}
          >
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("../assets/favourites.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </View>
            <View>
              <Text style={styles.TextSmall}> Add to favourites</Text>
            </View>
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
          <TouchableOpacity
            style={personalStyles.addToFavouriteBtn}
            onPress={() => showConfirmDialog()}
          >
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("../assets/favourites.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </View>
            <View>
              <Text style={styles.TextSmall}> Add to favourites</Text>
            </View>
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
          <TouchableOpacity
            style={personalStyles.addToFavouriteBtn}
            onPress={() => showConfirmDialog()}
          >
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("../assets/favourites.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </View>
            <View>
              <Text style={styles.TextSmall}> Add to favourites</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  addToFavouriteBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#8d918d",
    flexDirection: "row",
  },
});

export default ShowLatestPairingsScreen;
