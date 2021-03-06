import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text } from "@ui-kitten/components";
import Modal from "react-native-modal";
import { ImageHeaderScrollView } from "react-native-image-header-scroll-view";
import { SharedElement } from "react-navigation-shared-element";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5
} from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { AppToast } from "../Components/AppToast";
import AppLoadingIcon from "../Components/AppLoadingIcon";
import AppAlert from "../Components/AppAlert";
import { Auth } from "aws-amplify";

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 300;
const USER_FEEDBACK_API =
  "https://jkwhidy1cf.execute-api.eu-west-1.amazonaws.com/dev/userfeedback";

const PairingResultsScreen = ({ navigation, route }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const pairingResults = route.params;
  // console.log("your image is: " + pairingResults.b64img);
  // console.log("your data is: " + pairingResults.response);

  const [isLoading, setLoading] = useState(false);

  const [isErrorAlertVisible, setErrorAlertVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const submitFeedback = async (isCorrect, foodItem, img) => {

    setLoading(true);
    let JWTToken = "";
    await Auth.currentAuthenticatedUser({}) //Get user information
      .then((Data) => {
        JWTToken = Data.signInUserSession.idToken.jwtToken;
      })
      .catch((err) => console.log(err));

    await fetch(USER_FEEDBACK_API, {
      method: "POST",
      body: JSON.stringify({
        "IsCorrect": isCorrect,
        "FoodItem": foodItem,
        "Image": img
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: JWTToken,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.StatusCode === 200) {
          console.log("Sucess");
          setLoading(false);
          console.log("StatusCode Returned: " + json.StatusCode)
          setErrorAlertVisible(false);
          // Add a Toast on screen.
          AppToast.ToastDisplay(json.Data);
        }
        else if (json.StatusCode === 400) {
          console.log("Something went wrong");
          setLoading(false);
          //setModalMessage must come before setErrorAlertVisible
          setModalMessage(json.Data);
          setErrorAlertVisible(true);

        }
        else {
          console.log("failure");
          console.log(json);
        }
      })
      .catch((error) => {
        console.log(error);
        setModalMessage("Something went wrong.");
        setErrorAlertVisible(true);
        cancelPreview();
        setLoading(false);
      });
  };

  const FeedbackModal = () => (
    <Modal
      isVisible={isModalVisible}
      onBackButtonPress={toggleModal}
      onBackdropPress={toggleModal}
      animationIn={"slideInRight"}
      animationOut={"slideOutRight"}
      swipeDirection={["up", "left", "right", "down"]}
      onSwipeComplete={toggleModal}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={[styles.closeButton]}
            onPress={() => setModalVisible(!isModalVisible)}
          >
            <MaterialIcons name="close" size={30} color="black" />

          </TouchableOpacity>
          <View style={[styles.modalHeaderSection]}>
            <Text style={styles.title}>Help us improve </Text>
          </View>
          <Text style={styles.modalText}>
            Is the food correctly identified?
          </Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonIncorrect]}
              onPress={() => {
                submitFeedback(false, pairingResults.response.Data[0].FoodItem, pairingResults.b64img)
                setModalVisible(!isModalVisible);
              }}
            >
              <MaterialIcons name="thumb-down" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonCorrect]}
              onPress={() => {
                submitFeedback(true, pairingResults.response.Data[0].FoodItem, pairingResults.response.Data[0].FoodImage)
                setModalVisible(!isModalVisible);
              }}            >
              <MaterialIcons name="thumb-up" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const TitleBar = () => (
    <View
      style={[
        styles.section,
        {
          flexDirection: "row",
          justifyContent: "center",
        },
      ]}
    >
      <Text style={styles.title}>
        {pairingResults.response.Data[0].FoodItem}
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          left: "10%",
        }}
        onPress={() => setModalVisible(true)}
      >
        {/* <MaterialIcons name="error-outline" size={24} color="red" /> */}
        <Ionicons name="ios-flag-outline" size={24} color="red" />
        <FeedbackModal />
      </TouchableOpacity>
    </View>
  );

  const FoodDescription = () => (
    <View style={[styles.section]}>
      <Text style={styles.sectionText}>
        {pairingResults.response.Data[0].FoodDesc}
      </Text>
    </View>
  );

  const TagBar = () => (
    <View style={styles.tagsSection}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginLeft: "10%",

        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <View style={styles.rowContainer}>
          {pairingResults.response.Data[0].FoodTags.map((tag, index) => (
            <View style={styles.tagContainer} key={index}>
              {/* <FontAwesome name="tag" size={16} color="#fff" /> */}
              <FontAwesome5
                name="hamburger"
                size={16}
                color="#fff"
              />
              {/* Keeping outlined icons just incase we want to change to them for consistency overall */}
              {/* The filled icons look better in this case though */}
              {/* <Feather name="tag" size={16} color="#fff" /> */}
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const RecommendedDrink = () => (
    <View style={[styles.section, styles.centeredView]}>
      <Text style={styles.subtitle}>Suggested for you</Text>
      {/* Main recommendedDrink */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("Results", {
            screen: "DrinkDetailsScreen",
            params: { item: pairingResults.response.Data[0] },
          });
        }}
      >
        <SharedElement id={pairingResults.response.Data[0].DrinkID}>
          <Image
            source={{ uri: pairingResults.response.Data[0].DrinkImage }}
            style={[styles.drinkCard, styles.bigDrinkCard]}
          />
        </SharedElement>
        <Animatable.View
          animation="fadeIn"
          delay={200}
          style={[styles.cardBackgroundOverlay, { width: 300 }]}
        >
          {/* <SharedElement id={response.Data.recommendedDrink.drinkName}> */}
          <Text style={[styles.cardTextOverlay]}>
            {pairingResults.response.Data[0].DrinkItem}
          </Text>
          {/* </SharedElement> */}
        </Animatable.View>
      </TouchableOpacity>
    </View>
  );

  const OtherDrinks = () => (
    <View style={[styles.section, styles.centeredView]}>
      <Text style={styles.subtitle}>You might also like</Text>

      <ScrollView
        style={styles.otherDrinkCardsContainer}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
        horizontal={false}
      >
        {pairingResults.response.Data.slice(1).map((pairing, index) => (
          //.slice(1) is used to skip the first element of the Data
          <View key={index}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("Results", {
                  screen: "DrinkDetailsScreen",
                  params: { item: pairing },
                });
              }}
            >
              <SharedElement id={pairing.DrinkID}>
                <Image
                  source={{ uri: pairing.DrinkImage }}
                  style={[styles.drinkCard, styles.smallDrinkCard]}
                />
              </SharedElement>
              <View style={[styles.cardBackgroundOverlay, { width: 150 }]}>
                {/* <SharedElement id={response.Data.recommendedDrink.drinkName}> */}
                <Text style={[styles.cardTextOverlay]}>
                  {pairing.DrinkItem}
                </Text>
                {/* </SharedElement> */}
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  //Somehow the this line affects the animation
  //Each time the screen comes into focus, the animations
  //for the drink titles animate
  //however there are side effects such as image flickering
  //and transitioning too fast making the whole transition
  //look very botched
  // const isFocused = useIsFocused();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageHeaderScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        renderHeader={() => (
          <Image
            style={styles.foodCard}
            source={{ uri: pairingResults.response.Data[0].FoodImage }}
          />
        )}
      >
        <TitleBar />
        <FoodDescription />
        <TagBar />
        <RecommendedDrink />
        <OtherDrinks />
        {isLoading === true && <AppLoadingIcon />}
        {isErrorAlertVisible === true && (
          <AppAlert visible={true} message={modalMessage} type={"Error"} />
        )}

      </ImageHeaderScrollView>
    </View>
  );
};
export default PairingResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  foodCard: {
    height: MAX_HEIGHT,
    width: Dimensions.get("window").width,
    alignSelf: "stretch",
    resizeMode: "cover",
  },
  title: {
    fontSize: 22,
    alignSelf: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    padding: 10,
    // borderWidth: 1,
    borderRadius: 20,
    width: "100%",
    // backgroundColor: "#EAEAEA",
    borderBottomColor: "#cccccc",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    backgroundColor: "white",
  },
  sectionText: {
    fontSize: 16,
    textAlign: "center",
  },
  tagsSection: {
    //Different from section because theres no padding on the right or left
    //We do this so theres no visible cutoff as you scroll left or right
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    backgroundColor: "white",
  },
  rowContainer: {
    //Container to hold all tags
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    flexWrap: "wrap",
  },
  tagContainer: {
    //Container of individual tag
    flexDirection: "row", //Needed to keep the tag icon and text in one line
    backgroundColor: "#C41ED4",
    borderRadius: 20,
    margin: 5, //Space between tags
    padding: 10, //Space around innner tag
    elevation: 2, //gives shadow/3D effect
  },
  tagText: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 10, //Space between tag icon and text
  },
  drinkCard: {
    //Card style for drinks
    // borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    margin: 5,
    padding: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 3,
    // backgroundColor: "red",
    // flexDirection: "row",
    resizeMode: "cover",

    // resizeMode: "contain",
    // borderWidth: 1,//Contain and border width=1 will give the blured effect
    //But will also create an image flicker after the big to small animation
  },
  smallDrinkCard: {
    width: 150,
    height: 150,
  },
  bigDrinkCard: {
    width: 300,
    height: 300,
  },
  otherDrinkCardsContainer: {
    marginHorizontal: 16,
    marginTop: 10,
    width: "100%",
  },
  cardTextOverlay: {
    fontSize: 20,
    color: "white",
    // color: "black",
    marginHorizontal: 10,
    fontWeight: "600",
    textAlign: "center",
    // backgroundColor: "rgba(0,0,0,0.3)",
  },
  cardBackgroundOverlay: {
    // position: "absolute",
    height: 50,
    left: 5,
    bottom: 5,
    // backgroundColor: "rgba(0,0,0,0.1)",
    // backgroundColor: "#4F6D7A",
    // backgroundColor: "#DD6E42",
    // backgroundColor: "#FF6347",
    backgroundColor: "#1FBFBA",
    // backgroundColor: "#E8DAB2",
    // backgroundColor: "#C0D6DF",
    // backgroundColor: "#EAEAEA",
    // backgroundColor: "#06D6A0",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // borderWidth: 1,
    elevation: 2,

    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 4,
    margin: 5,
  },
  buttonCorrect: {
    backgroundColor: "#56a211",
  },
  buttonIncorrect: {
    backgroundColor: "#e9430f",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 5,
  },
  modalHeaderSection: {
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    backgroundColor: "white",
  },
  modalText: {
    paddingVertical: 10,
    fontSize: 20,
    textAlign: "center",
  },
});
