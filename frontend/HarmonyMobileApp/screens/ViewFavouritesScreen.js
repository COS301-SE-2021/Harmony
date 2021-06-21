import React, { useEffect,useState } from "react";
import { useIsFocused } from "@react-navigation/native";  
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
  FlatList
} from "react-native";


import {
  FontAwesome,
  AntDesign,
  MaterialIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";

import styles from "../styles";

const ViewFavouritesScreen = (props) => {
  const viewFavouritesURL ="https://ypveh68wo0.execute-api.eu-west-1.amazonaws.com/dev";
  const deleteFavourite="https://op7td19wdb.execute-api.eu-west-1.amazonaws.com/dev";
const [isLoading, setLoading] = useState(useIsFocused());
const [data, setData] = useState([]);

useEffect(() => {
  fetch(viewFavouritesURL,{
    method:"POST",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      "UID":"u1"
    })
  })
    .then((response) => response.json())
    .then((json) => setData(json.Data))
    .catch((error) => alert(error))
    .then(setLoading(false));
});

  const showConfirmDialog = (pid) => {
    return Alert.alert(
      "Delete",
      "Are you sure you want to remove this pairing from favourites?",
      [
       
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
         // The "Yes" button
         {
          text: "Yes",
          onPress: () => {
            fetch(deleteFavourite,{
              method:"POST",
              headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
              },
              body:JSON.stringify({
                "UID":"u1",
                "PID":pid
              })
            })
              .catch((error) => alert(error))
            //setShowBox(false);
          },
        },
      ]
    );
  };
  return (
    <SafeAreaView style={personalStyles.container}>
      <View style={{ paddingBottom: "2%", paddingRight: "0.5%" }}>
        <ScrollView style={personalStyles.scrollView}>
          <View style={{ paddingTop: "0%" }}>
            <View style={styles.backgroundBarShowLatest}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ justifyContent: "center" }}>
                  <Text style={styles.TextLarge}> My favourites </Text>
                </View>
              </View>
            </View>
          </View>
          <FlatList
    data={data}
    keyExtractor={({PID},index)=>PID}
    renderItem={({item})=>( <View style={styles.backgroundBarShowLatest}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.TextMedium}> {item.FoodItem} </Text>
        <View style={{ justifyContent: "center" }}>
          <Image
            source={require("../assets/plus.png")}
            style={styles.smallImage}
          />
        </View>
        <Text style={styles.TextMedium}> {item.DrinkItem} </Text>
        <TouchableOpacity
        style={personalStyles.addToFavouriteBtn}
        onPress={() => showConfirmDialog(item.PID)}
      >
        <AntDesign name="minuscircleo" size={30} color="red" />
      </TouchableOpacity>
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
            {item.Location}
          </Text>
        </View>
      </View>
     
    </View>)}
    />
         
        
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
  secondContainer:{
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default ViewFavouritesScreen;
