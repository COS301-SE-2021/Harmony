import React, { useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "./AppButton";

export default function AppAlert({ visible, message, type }) {
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
          <View style={styles.icon}>
            <MaterialIcons name="error" size={50} color="tomato" />
          </View>

          <Text style={styles.title}>{type} </Text>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.rowContainer}>
            <AppButton title="Try again" onPress={toggleModal} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    alignSelf: "center",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // justifyContent: "flex-end",
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
  modalText: {
    paddingVertical: 10,
    fontSize: 20,
    textAlign: "center",
  },
  icon: {
    padding: 10,
  },
});
