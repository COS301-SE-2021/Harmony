import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { Auth } from "aws-amplify";
import { SafeAreaView } from "react-native-safe-area-context";

import AppTextInput from "../Components/AppTextInput";
import AppButton from "../Components/AppButton";
import { AppToast } from "../Components/AppToast";
import AppLoadingIcon from "../Components/AppLoadingIcon";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SocialIcon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { showMessage, hideMessage } from "react-native-flash-message";
import Modal from "react-native-modal";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
export default function SignIn({ navigation, updateAuthState }) {
  const [isLoading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  async function signIn(values) {
    try {
      setLoading(true);
      await Auth.signIn(values.Username, values.Password);
      setLoading(false);
      console.log("Success, Signed in");

      // Add a Toast on screen.
      AppToast.ToastDisplay("Signed in");

      updateAuthState("loggedIn");
    } catch (error) {
      console.log(" Error signing in...", error);
      // Alert.alert("Error", error.message);
      setModalVisible(true);
      // showMessage({
      //   message: "Error",
      //   description: error.message,
      //   type: "danger",
      // });

      setLoading(false);
    }
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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

  return (
    <Formik
      initialValues={{
        Username: "",
        Password: "",
      }}
      onSubmit={(values) => signIn(values)}
      validationSchema={yup.object().shape({
        Username: yup
          .string()
          .min(2)
          .max(20)
          .required("Please, provide your Username!"),
        Password: yup
          .string()
          .min(8)
          .required("Please, provide your Password!"),
      })}
    >
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
      }) => (
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.header}>
              <Text style={styles.text_header}>Sign in to your account</Text>
            </View>

            <Animatable.View animation="fadeInUpBig" style={styles.body}>
              <AppTextInput
                value={values.Username}
                onChangeText={handleChange("Username")}
                onBlur={() => setFieldTouched("Username")}
                leftIcon="account"
                placeholder="Enter Username"
                keyboardType="email-address"
                textContentType="emailAddress"
                error={errors.Username}
                touched={touched.Username}
              />
              {/* If the user has clicked on the input field and it is not valid */}
              {touched.Username && errors.Username && (
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                  {errors.Username}
                </Text>
              )}
              <AppTextInput
                value={values.Password}
                onChangeText={handleChange("Password")}
                leftIcon="lock"
                placeholder="Enter Password"
                autoCorrect={false}
                onBlur={() => setFieldTouched("Password")}
                secureTextEntry={true}
                error={errors.Password}
                touched={touched.Password}
              />
              {touched.Password && errors.Password && (
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                  {errors.Password}
                </Text>
              )}

              <AppButton
                title="Login"
                disabled={!isValid}
                onPress={handleSubmit}
              />
              <View style={styles.footerTextContainer}>
                <Text
                  onPress={() => navigation.navigate("ForgotPassword")}
                  style={styles.footerLink}
                >
                  {" "}
                  Forgot Password
                </Text>
              </View>
            </Animatable.View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
              <View style={styles.footerIcons}>
                <SocialIcon type="facebook" />
                <SocialIcon type="google" />
              </View>

              <View style={styles.footerTextContainer}>
                <Text style={styles.footerText}>
                  Don't have an account?
                  <Text
                    onPress={() => navigation.navigate("SignUp")}
                    style={styles.signUpLink}
                  >
                    {" "}
                    Sign Up
                  </Text>
                </Text>
              </View>
            </Animatable.View>
          </View>
          <FeedbackModal />

          {isLoading === true && <AppLoadingIcon />}
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#009387",
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  body: {
    alignItems: "center",
    flex: Platform.OS === "ios" ? 3 : 1,
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  footer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  footerIcons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerTextContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  footerLink: {
    color: "#788eec",
    fontSize: 19,
    fontWeight: "600",
  },
  signUpLink: {
    // color: "#ffa07a",
    color: "#afeeee",
    // color: "#00ffff",
    fontSize: 19,
    fontWeight: "600",
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
