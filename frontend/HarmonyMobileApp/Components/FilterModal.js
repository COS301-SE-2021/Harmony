import React, { useState, useEffect } from "react";
import {
  View,
  Pressable,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import styles from "../styles";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Modal from "react-native-modal";
import { Text } from "@ui-kitten/components";
import { Slider } from "react-native-elements";
import FilterTag from "./FilterTag";
import { Picker } from "@react-native-picker/picker";
import ReduxStore from "../Components/ReduxStore"


export default function FilterModal({ sortPairingsName, ...otherProps }) {
  const [sortPairings, setSortPairings] = useState(sortPairingsName); // the type of pairings shown filter
  const [locationValueSlider, setLocationValueSlider] = useState(0); //distance filter
  const [locationValueTextInput, setLocationValueTextInput] = useState(0); //distance filter
  const [isModalVisible, setModalVisible] = useState(true); //for the filter popup
  const filters = {
    mealTypes: ["Breakfast", "Lunch", "Supper", "Snack", "Vegetarian", "Dairy-Free", "Nut-Free"],
    foods: ["Spicy", "Savoury", "Salty", "Sweet", "Sour", "Hot", "Warm", "Cold",],
    drinks: ["Alcoholic", "Non-Alcoholic", "Fizzy", "Sweet", "Sour", "Bitter", "Hot", "Warm", "Cold",],
  };

  //toggles the modals visibility
  const toggleModal = () => {
    //    setSortPairings(ReduxStore.getState().sortPairings)
    setModalVisible(!isModalVisible);
  };
  const ClearAll = () => {
    toggleModal();

    ReduxStore.dispatch({
      type: "CLEAR",
      //payload is the standard adopted name for the state value
      payload: { "ApplyFilter": true }
    });

  };
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const applyFilters = () => {
    ReduxStore.dispatch({
      type: "APPLYFILTER",
      payload: { "ApplyFilter": true }
    })
    toggleModal();
  }

  const onChanged = (number) => {
    if (number.length === 0) {
      setLocationValueTextInput(0)
    } else {
      setLocationValueTextInput(parseInt(number.replace(/[^0-9]/g, '')))
    }
  }
  useEffect(() => {
    // console.log("location value updated " + locationValueSlider)
    setLocationValueTextInput(locationValueSlider);
    if (locationValueSlider != 0) {
      ReduxStore.dispatch({
        type: "UPDATERANGE",
        payload: { "Range": locationValueSlider }
      })
    }
  }, [locationValueSlider]);

  useEffect(() => {
    //console.log("location value updated " + locationValueTextInput)
    setLocationValueSlider(locationValueTextInput);
    if (locationValueTextInput != 0) {
      ReduxStore.dispatch({
        type: "UPDATERANGE",
        payload: { "Range": locationValueTextInput }
      })
    }
  }, [locationValueTextInput]);

  useEffect(() => {
    //console.log("sort pairings updated " + sortPairings)

    ReduxStore.dispatch({
      type: "CHANGESORT",
      payload: { "sort": sortPairings }
    })

  }, [sortPairings]);

  return (
    <Modal
      isVisible={isModalVisible}
      onBackButtonPress={toggleModal}
      onBackdropPress={toggleModal}
      animationIn={"slideInRight"}
      animationOut={"slideOutRight"}
      // removed swipe direction because it was hard to use the scrollview and slider with it
      // swipeDirection={["up", "left", "right", "down"]}
      // swipeDirection={["left", "right"]}
      onSwipeComplete={toggleModal}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}

    >

      {/* DO NOT UNCOMMENT:This line will cause a terrible glitchy effect that is horrible to watch */}
      {/* <StatusBar hidden={true} /> */}

      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={personalStyles.headingContainer}>
            <Text
              style={[styles.TextMedium, personalStyles.modalHeading,]} >
              Filter Pairings
            </Text>
            <TouchableOpacity
              style={[styles.closeButton]}
              onPress={() => setModalVisible(!isModalVisible)}
            >
              <MaterialIcons name="close" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView style={personalStyles.scrollView}>
            <View style={styles.filterView}>
              <View style={[styles.filterLabelRow]}>
                <Text
                  style={[styles.spaceLeft, styles.TextSmall, { paddingTop: 5 }]}
                >
                  Sort Pairings
                </Text>
                <View style={[styles.spaceRight, { flex: 0 }]}>
                  <AntDesign
                    name="caretdown"
                    size={12}
                    style={{ paddingVertical: "10%", marginLeft: 10 }}
                    color="#7C7C7C"
                  />
                  <Text
                    style={[
                      styles.TextSmaller,
                      {
                        flex: 1,
                        textAlign: "center",
                        justifyContent: "center",
                      },
                    ]}
                  >
                    {sortPairings}
                  </Text>
                </View>
              </View>
              <View style={styles.pickerView}>
                <Picker
                  selectedValue={sortPairings}
                  style={[styles.TextSmall, { height: 40, width: 300 }]}
                  onValueChange={(itemValue, itemIndex) => {
                    setSortPairings(itemValue);
                    // console.log(itemValue);
                  }}
                >
                  <Picker.Item label="Trending" value="Trending" />
                  <Picker.Item label="New" value="New" />
                  <Picker.Item label="Best" value="Best" />
                  <Picker.Item label="Controversial" value="Controversial" />
                  <Picker.Item label="Nearby" value="Closest" />
                </Picker>
              </View>
            </View>
            <Text style={{ height: 7 }}></Text>

            <View style={styles.filterView}>
              <View style={[styles.filterLabelRow]}>
                <Text style={[styles.spaceLeft, styles.TextSmall]}>Distance</Text>
              </View>
              <View
                style={[styles.flexRowJustCenter, {
                  marginTop: -10,
                }]}
              >
                <Text style={[styles.TextSmall, { marginRight: 4 }]}>0</Text>
                <Slider
                  value={locationValueSlider}
                  step={20}
                  maximumValue={1000}
                  onValueChange={(value) => (
                    // console.log(value), 
                    setLocationValueSlider(value)
                  )}
                  style={{ width: "70%" }}
                  thumbStyle={{
                    width: 20,
                    height: 20,
                    backgroundColor: "grey",
                  }}
                />
                <Text style={[styles.TextSmall, { marginLeft: 4 }]}>1000</Text>
              </View>
              <View style={styles.flexRowJustCenter}>
                <TextInput
                  style={[styles.TextSmall, styles.TextInputStyling]}
                  onChangeText={(value) => onChanged(value)}
                  value={locationValueTextInput.toString()}
                  keyboardType="numeric"
                  placeholder="0"
                  multiline={false}
                />
                <Text style={[styles.TextSmaller]}>KM</Text>
              </View>
            </View>
            <Text style={{ height: 7 }}></Text>

            <View style={styles.filterView}>
              <View style={[styles.filterLabel]}>
                <View style={styles.flexRow}>
                  <MaterialIcons
                    name="fastfood"
                    size={18}
                    style={personalStyles.iconStyle}
                    color="black"
                  />
                  <Text style={[styles.spaceLeft, styles.TextSmall]}>
                    Meal Types
                  </Text>
                </View>
                <View style={[styles.filterTagsContainer]}>
                  <View
                    style={personalStyles.filterContainer}
                  >
                    {/* Mapping of the tags from the JSON to the components*/}
                    {filters.mealTypes.map((tag, index) => (
                      <View key={index}>
                        <FilterTag color="#FF6347" title={tag} filterType="mealTypes" />
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
            <Text style={{ height: 7 }}></Text>

            <View style={styles.filterView}>
              <View style={[styles.filterLabel]}>
                <View style={styles.flexRow}>
                  <FontAwesome5
                    name="hamburger"
                    size={18}
                    style={personalStyles.iconStyle}
                    color="black"
                  />
                  <Text style={[styles.spaceLeft, styles.TextSmall]}>Foods</Text>
                </View>
                <View
                  style={[
                    styles.filterTagsContainer,
                    { flexDirection: "column" },
                  ]}
                >
                  <View
                    style={personalStyles.filterContainer}
                  >
                    {/* Mapping of the tags from the JSON to the components*/}
                    {filters.foods.map((tag, index) => (
                      <View key={index}>
                        <FilterTag color="#C41ED4" title={tag} filterType="food" />
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
            <Text style={{ height: 7 }}></Text>

            <View style={styles.filterView}>
              <View style={[styles.filterLabel]}>
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="cup"
                    size={18}
                    style={personalStyles.iconStyle}
                    color="black"
                  />
                  <Text style={[styles.spaceLeft, styles.TextSmall]}>Drinks</Text>
                </View>
                <View
                  style={[
                    styles.filterTagsContainer,
                    { flexDirection: "column" },
                  ]}
                >
                  <View
                    style={personalStyles.filterContainer}
                  >
                    {/* Mapping of the tags from the JSON to the components*/}
                    {filters.drinks.map((tag, index) => (
                      <View key={index}>
                        <FilterTag color="#1FBFBA" title={tag} filterType="drinks" />
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>


          </ScrollView>
          <Text style={{ height: 7 }}></Text>
          <View style={styles.flexRow}>
            <Pressable
              style={[styles.applyButton]}
              onPress={() => ClearAll()}
            >
              <Text
                style={[
                  styles.TextSmall,
                  personalStyles.buttonText,
                ]}
              >
                Clear All
              </Text>
            </Pressable>
            <Pressable
              style={[styles.applyButton]}
              onPress={() => applyFilters()}
            >
              <Text
                style={[
                  styles.TextSmall,
                  personalStyles.buttonText,
                ]}
              >
                Apply
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const personalStyles = StyleSheet.create({

  modalHeading: {
    fontWeight: "bold",
    flex: 1,
    justifyContent: "center",
    paddingBottom: "7%",
    textAlign: "center"
  },
  headingContainer: {
    flexDirection: "row",
    width: "100%",
    textAlign: "center",
  },
  scrollView: {
    width: "100%",
    height: "85%",
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  iconStyle: {
    paddingTop: 3,
    marginRight: 5
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  }

});

