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
import AppAlert from "../Components/AppAlert";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SocialIcon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { showMessage, hideMessage } from "react-native-flash-message";

export default function SignIn({ navigation, updateAuthState }) {
  const [isLoading, setLoading] = useState(false);
  const [isErrorAlertVisible, setErrorAlertVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  async function signIn(values) {
    try {
      setLoading(true);
      setErrorAlertVisible(false);

      await Auth.signIn(values.Username, values.Password);
      setLoading(false);
      console.log("Success, Signed in");

      // Add a Toast on screen.
      AppToast.ToastDisplay("Signed in");

      updateAuthState("loggedIn");
    } catch (error) {
      console.log(" Error signing in...", error);

      //setModalMessage must come before setErrorAlertVisible
      setModalMessage(error.message);
      setErrorAlertVisible(true);
      setLoading(false);
    }
  }

  return (
    <Formik
      initialValues={{
        Username: "",
        Password: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        await signIn(values);
        resetForm();
      }}
      validationSchema={yup.object().shape({
        Username: yup
          .string()
          .matches(/^\S*$/, "Username may not contain spaces") //Contains no spaces
          .required("Please, provide your Username!"),
        Password: yup.string().required("Please, provide your Password!"),
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
              {/* V2 */}
              {/* <Text style={styles.text_header}>Welcome back</Text> */}
              {/* V1 */}
              <Text style={styles.text_header}>Sign in to your account</Text>
              {/* V2 */}
              {/* <Text style={styles.bodyText}>Sign in below</Text> */}
            </View>

            <Animatable.View animation="fadeInUpBig" style={styles.body}>
              {/* V3 */}
              {/* <View style={styles.bodyTitle}>
                <Text style={styles.bodyText}>
                  Fill in your details below to Sign into your account
                </Text>
              </View> */}
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
                // secureTextEntry={true}
                error={errors.Password}
                touched={touched.Password}
                type="Password"
              />
              {touched.Password && errors.Password && (
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                  {errors.Password}
                </Text>
              )}

              <AppButton
                title="Sign in"
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
          {isErrorAlertVisible === true && (
            <AppAlert visible={true} message={modalMessage} type={"Error"} />
          )}
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
  bodyText: {
    fontSize: 16,
    color: "#6e6869", //V1
    // color: "#fff",//V2
    textAlign: "center",
    // paddingVertical: 10,//V2
  },
  bodyTitle: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    // paddingBottom: 20,
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
});
