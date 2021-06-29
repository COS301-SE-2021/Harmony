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
import { ApplicationProvider, Layout,Button, Divider,List,ListItem, Card,Text } from '@ui-kitten/components';
import { default as theme } from '../theme.json';
import styles from "../styles";
import Icon from 'react-native-vector-icons/FontAwesome';

const viewReviewScreen = (props) => {
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
    <Layout style={{ flex: 1, alignItems: 'center' }}>
      <Text>Hello from review page</Text>

            <View style={{padding:10}}>
            <Card>
              <View style={{flexDirection:"row", borderWidth:2, borderColor:"#d3d3d3",borderRadius:5}}>
                    <Image
                      source={require("../assets/waffles.jpg")}
                      style={styles.standardImage}
                    />
                    <Image
                      source={require("../assets/milkshake.jpg")}
                      style={styles.standardImage}
                    />
              </View>
              <Text>FoodItem</Text>
              <Text>DrinkItem</Text>
              <Text>Pairing descr</Text>
              <View style={{flexDirection:"row"}}>
              <Icon name="compass" size={25} color="#000" style={{paddingRight:"5%"}}/>
              <Text>Location</Text>
              <Icon name="pencil" size={25} color="#000" style={{paddingLeft:"50%"}}/>
              <Icon name="heart-o" size={25} color="#000" style={{paddingLeft:"5%"}}/>
              </View>
            </Card>
            </View>

            <Text>Reviews</Text>
            <ScrollView style={styles.reviewContainer}>
                <List
                style={{}}
                data={data}
                ItemSeparatorComponent={Divider}
                renderItem={({ item })=>(
                    <View >
                    <Text>User</Text>
                    <Text>Time</Text>
                    <Text>User Review</Text>
                    </View>
                )}
                />
            </ScrollView>
        
    </Layout>
  </ApplicationProvider>
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

export default viewReviewScreen;
