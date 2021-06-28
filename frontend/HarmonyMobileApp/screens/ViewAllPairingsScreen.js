import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { render } from "react-dom";
import {
  View,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout,Button, Divider, Card,Text } from '@ui-kitten/components';
import { default as theme } from '../theme.json';
import styles from "../styles";
import Icon from 'react-native-vector-icons/FontAwesome';

const ViewAllPairingsScreen = (props) => {
  const viewPairingURL =
    "https://qkvdftfq7b.execute-api.eu-west-1.amazonaws.com/dev/viewpairings";
  const [isLoading, setLoading] = useState(useIsFocused());
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(viewPairingURL)
      .then((response) => response.json())
      .then((json) => setData(json.Data))
      .catch((error) => alert(error))
      .then(setLoading(false));
  });

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
    
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Label</Text>
      <ScrollView>
    {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ PID }, index) => PID}
            renderItem={({ item }) => (
            <View style={{padding:10}}>
            <Card>
              <View style={{flexDirection:"row"}}>
                    <Image
                      source={require("../assets/waffles.jpg")}
                      style={{ width: "45%", height: 80, resizeMode: "contain" }}
                    />
                    <Image
                      source={require("../assets/milkshake.jpg")}
                      style={{ width: "45%", height: 80, resizeMode: "contain" }}
                    />
              </View>
              <Text>{item.FoodItem}</Text>
              <Text>{item.DrinkItem}</Text>
              <Text>Pairing descr</Text>
              <View style={{flexDirection:"row"}}>
              <Icon name="thumb-tack" size={25} color="#000" style={{paddingRight:"5%"}}/>
              <Text>Location</Text>
              <Icon name="pencil" size={25} color="#000" style={{paddingLeft:"50%"}}/>
              <Icon name="heart-o" size={25} color="#000" style={{paddingLeft:"5%"}}/>
              </View>
            </Card>
            </View>
            )}
            />
          )}
          </ScrollView>
    </Layout>
  </ApplicationProvider>
   /* <SafeAreaView style={personalStyles.container}>
      <View style={styles.backgroundBarShowLatest}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.TextLarge}> Popular Pairings </Text>
          </View>
        </View>
      </View>
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ PID }, index) => PID}
            renderItem={({ item }) => (
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
                      source={require("../assets/person.png")}
                      style={{ width: 40, height: 40, resizeMode: "contain" }}
                    />
                  </View>
                  <View>
                    <Text style={styles.TextSmall}> {item.UID} </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.TextMedium}> {item.FoodItem} </Text>
                  <View style={{ justifyContent: "center" }}>
                    <Image
                      source={require("../assets/plus.png")}
                      style={styles.smallImage}
                    />
                  </View>
                  <Text style={styles.TextMedium}> {item.DrinkItem} </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ justifyContent: "center" }}>
                    <Image
                      source={require("../assets/location.png")}
                      style={{ width: 30, height: 30, resizeMode: "contain" }}
                    />
                  </View>
                  <View>
                    <Text style={styles.TextSmall}>{item.Location}</Text>
                  </View>
                </View>
                <TouchableOpacity style={personalStyles.addToFavouriteBtn}>
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
            )}
          />
        )}
      </View>
    </SafeAreaView>*/
  );
};
const personalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 130,
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
