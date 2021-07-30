import React, { useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
export default function AppAlert({ visible }) {
  const [isModalVisible, setModalVisible] = useState(visible);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackButtonPress={toggleModal}
      onBackdropPress={toggleModal}
      animationIn={"slideInRight"}
      animationOut={"slideOutRight"}
      swipeDirection={["up", "left", "right", "down"]}
      onSwipeComplete={toggleModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={[styles.closeButton]}
            onPress={() => setModalVisible(!isModalVisible)}
          >
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={30}
              color="black"
            />
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
              onPress={() => setModalVisible(!isModalVisible)}
            >
              {/* Keeping outlined icons just incase we want to change to them for consistency overall */}
              {/* The filled icons look better in this case though */}
              {/* <MaterialIcons
                      name="thumb-down-off-alt"
                      size={40}
                      color="white"
                    /> */}
              <MaterialIcons name="thumb-down" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonCorrect]}
              onPress={() => setModalVisible(!isModalVisible)}
            >
              {/* Keeping outlined icons just incase we want to change to them for consistency overall */}
              {/* The filled icons look better in this case though */}
              {/* <MaterialIcons
                      name="thumb-up-off-alt"
                      size={40}
                      color="white"
                    /> */}
              <MaterialIcons name="thumb-up" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
