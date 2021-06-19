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
import styles from "./styles";

const ViewAllPairingsScreen = (props) => {
  return (
    <SafeAreaView style={personalStyles.container}>
      <View style={{ paddingTop: "20%" }}>
        <Text style={styles.TextLarge}>Here are all the recent pairings</Text>
      </View>
      <ScrollView style={personalStyles.scrollView}>
        <View style={styles.backgroundBarShowLatest}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <View>
              <Image
                source={require("./assets/person.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </View>
            <View>
              <Text style={styles.TextSmall}> User9468 </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.TextMedium}> Waffles </Text>
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("./assets/plus.png")}
                style={styles.smallImage}
              />
            </View>
            <Text style={styles.TextMedium}> A Milkshake </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("./assets/location.png")}
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
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("./assets/favourites.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </View>
            <View>
              <Text style={styles.TextSmall}> Add to favourites</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.backgroundBarShowLatest}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <View>
              <Image
                source={require("./assets/person.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </View>
            <View>
              <Text style={styles.TextSmall}> User9468 </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.TextMedium}> Burgers </Text>
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("./assets/plus.png")}
                style={styles.smallImage}
              />
            </View>
            <Text style={styles.TextMedium}> Coke </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("./assets/location.png")}
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
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("./assets/favourites.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </View>
            <View>
              <Text style={styles.TextSmall}> Add to favourites</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.backgroundBarShowLatest}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <View>
              <Image
                source={require("./assets/person.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </View>
            <View>
              <Text style={styles.TextSmall}> User9468 </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.TextMedium}> French Toast </Text>
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("./assets/plus.png")}
                style={styles.smallImage}
              />
            </View>
            <Text style={styles.TextMedium}> Coffee </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("./assets/location.png")}
                style={{ width: 30, height: 30, resizeMode: "contain" }}
              />
            </View>
            <View>
              <Text style={styles.TextSmall}> 1855, Lynnwood, Pretoria</Text>
            </View>
          </View>
          <TouchableOpacity style={personalStyles.addToFavouriteBtn}>
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("./assets/favourites.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </View>
            <View>
              <Text style={styles.TextSmall}> Add to favourites</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.backgroundBarShowLatest}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <View>
              <Image
                source={require("./assets/person.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </View>
            <View>
              <Text style={styles.TextSmall}> User9468 </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.TextMedium}> Bunny Chow </Text>
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("./assets/plus.png")}
                style={styles.smallImage}
              />
            </View>
            <Text style={styles.TextMedium}> Coke </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("./assets/location.png")}
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
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("./assets/favourites.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </View>
            <View>
              <Text style={styles.TextSmall}> Add to favourites</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.backgroundBarShowLatest}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <View>
              <Image
                source={require("./assets/person.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </View>
            <View>
              <Text style={styles.TextSmall}> User9468 </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.TextMedium}> Koeksister </Text>
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("./assets/plus.png")}
                style={styles.smallImage}
              />
            </View>
            <Text style={styles.TextMedium}> Tea </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("./assets/location.png")}
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
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("./assets/favourites.png")}
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

export default ViewAllPairingsScreen;
