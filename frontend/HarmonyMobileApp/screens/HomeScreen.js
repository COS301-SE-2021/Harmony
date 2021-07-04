import React from "react";
import {
  View,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "../styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Feather,SimpleLineIcons  } from '@expo/vector-icons'; 
import * as eva from '@eva-design/eva';
import { default as theme } from '../theme.json';
import { ApplicationProvider, Layout,Button, Divider, Card,Text } from '@ui-kitten/components';

const HomeScreen = (props) => {
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
<ApplicationProvider  {...eva} theme={{ ...eva.light, ...theme }} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{height:"100%"}}>
        <View style={styles.Header}>
              <Text style={styles.TextLarge}> Harmony </Text>
        </View>
        <Card style={styles.cardContainer}>
                <View style={styles.imageContainer}>
                    <Image
                      source={require("../assets/waffles.jpg")}
                      style={styles.standardImage}
                    />
                    <Image
                      source={require("../assets/milkshake.jpg")}
                      style={styles.standardImage}
                    />
                </View>
                <View style={styles.cardText}>
                <Text>FoodItem</Text>
                <Text>DrinkItem</Text>
                <Text>Pairing descr</Text>
                </View>
                <View style={styles.locationBar}>
                    <SimpleLineIcons name="location-pin" size={25} color="black" />
                    <Text>Location</Text>
                    <Feather name="tag" size={25} color="black" />
                    <Text>Tag1,Tag2,Tag3,Tag4</Text>
                    
                </View>
                <Divider/>
                <View style={styles.iconsBar}>
                  <View style={{flexDirection:"row",justifyContent:"center"}}>
                  <Feather name="star" size={25} color="black" />
                  <Text style={{paddingLeft:"2%",paddingVertical:"1%"}}>4.6</Text>
                  </View>
                  <View style={{flexDirection:"row",justifyContent:"center"}}>
                  <Feather name="arrow-down-circle" size={25} color="black" />
                  <Text style={{paddingLeft:"2%",paddingVertical:"1%"}}>45</Text>
                  </View>
                  <View style={{flexDirection:"row",justifyContent:"center"}}>
                  <Feather name="arrow-up-circle" size={25} color="black" />
                  <Text style={{paddingLeft:"2%",paddingVertical:"1%"}}>100</Text>
                  </View>
                  <Feather name="heart" size={25} color="black" />
                </View>
                
                </Card>
               
                </View>
      </ScrollView>
      </ApplicationProvider>
  );
};
const personalStyles = StyleSheet.create({
 
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

export default HomeScreen;
