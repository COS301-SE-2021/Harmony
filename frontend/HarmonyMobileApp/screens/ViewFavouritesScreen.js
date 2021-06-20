import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";

import styles from "../styles";

// viewFavourites(POST)
// https://ypveh68wo0.execute-api.eu-west-1.amazonaws.com/dev
// request:
// {
//   "UID": uid
// }
// response:(this will be returned as an array, so keep that in mind)
// {
//   "Data":
//   [
//  "p1",
//  "p2",
//  "p3"
//   ]
// }

const ViewFavouritesScreen = (props) => {
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
  return (
    <SafeAreaView style={personalStyles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ PID }, index) => PID}
          renderItem={({ item }) => (
            <Text>
              {item.FoodItem}
              {item.DrinkItem}
            </Text>
          )}
        />
      )}
    </SafeAreaView>
  );
};
// return (
//   <SafeAreaView style={personalStyles.container}>
//     <View style={{ paddingBottom: "2%", paddingRight: "0.5%" }}>
//       <ScrollView style={personalStyles.scrollView}>
//         <View style={{ paddingTop: "0%" }}>
//           <View style={styles.backgroundBarShowLatest}>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <View style={{ justifyContent: "center" }}>
//                 <Text style={styles.TextLarge}> My favourites </Text>
//                 <Text style={styles.TextLarge}> my name is {state} </Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         <View style={styles.backgroundBarShowLatest}>
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <Text style={styles.TextMedium}> Waffles </Text>
//             <View style={{ justifyContent: "center" }}>
//               <Image
//                 source={require("../assets/plus.png")}
//                 style={styles.smallImage}
//               />
//             </View>
//             <Text style={styles.TextMedium}> A Milkshake </Text>
//           </View>
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <View style={{ justifyContent: "center" }}>
//               <Image
//                 source={require("../assets/location.png")}
//                 style={{ width: 30, height: 30, resizeMode: "contain" }}
//               />
//             </View>
//             <View>
//               <Text style={styles.TextSmall}>
//                 {" "}
//                 Waffle House, Ramsgate, South Coast
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View style={styles.backgroundBarShowLatest}>
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <Text style={styles.TextMedium}> Burgers </Text>
//             <View style={{ justifyContent: "center" }}>
//               <Image
//                 source={require("../assets/plus.png")}
//                 style={styles.smallImage}
//               />
//             </View>
//             <Text style={styles.TextMedium}> Coke </Text>
//           </View>
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <View style={{ justifyContent: "center" }}>
//               <Image
//                 source={require("../assets/location.png")}
//                 style={{ width: 30, height: 30, resizeMode: "contain" }}
//               />
//             </View>
//             <View>
//               <Text style={styles.TextSmall}>
//                 {" "}
//                 Rocomamas, Gateway, Umhlanga
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View style={styles.backgroundBarShowLatest}>
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <Text style={styles.TextMedium}> French Toast </Text>
//             <View style={{ justifyContent: "center" }}>
//               <Image
//                 source={require("../assets/plus.png")}
//                 style={styles.smallImage}
//               />
//             </View>
//             <Text style={styles.TextMedium}> Coffee </Text>
//           </View>
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <View style={{ justifyContent: "center" }}>
//               <Image
//                 source={require("../assets/location.png")}
//                 style={{ width: 30, height: 30, resizeMode: "contain" }}
//               />
//             </View>
//             <View>
//               <Text style={styles.TextSmall}> 1855, Lynnwood, Pretoria</Text>
//             </View>
//           </View>
//         </View>
//         <View style={styles.backgroundBarShowLatest}>
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <Text style={styles.TextMedium}> Bunny Chow </Text>
//             <View style={{ justifyContent: "center" }}>
//               <Image
//                 source={require("../assets/plus.png")}
//                 style={styles.smallImage}
//               />
//             </View>
//             <Text style={styles.TextMedium}> Coke </Text>
//           </View>
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <View style={{ justifyContent: "center" }}>
//               <Image
//                 source={require("../assets/location.png")}
//                 style={{ width: 30, height: 30, resizeMode: "contain" }}
//               />
//             </View>
//             <View>
//               <Text style={styles.TextSmall}>
//                 {" "}
//                 4 Chilli, Garsfontein, Pretoria
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View style={styles.backgroundBarShowLatest}>
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <Text style={styles.TextMedium}> Koeksister </Text>
//             <View style={{ justifyContent: "center" }}>
//               <Image
//                 source={require("../assets/plus.png")}
//                 style={styles.smallImage}
//               />
//             </View>
//             <Text style={styles.TextMedium}> Tea </Text>
//           </View>
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <View style={{ justifyContent: "center" }}>
//               <Image
//                 source={require("../assets/location.png")}
//                 style={{ width: 30, height: 30, resizeMode: "contain" }}
//               />
//             </View>
//             <View>
//               <Text style={styles.TextSmall}>
//                 {" "}
//                 Bakehouse, HazelWood, Pretoria
//               </Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   </SafeAreaView>
// );
//};
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

export default ViewFavouritesScreen;
