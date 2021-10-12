import React, { useState } from "react";
import { Text, View, StyleSheet, StatusBar, Platform } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { Auth } from "aws-amplify";

import AppTextInput from "../Components/AppTextInput";
import AppButton from "../Components/AppButton";
import { AppToast } from "../Components/AppToast";
import AppLoadingIcon from "../Components/AppLoadingIcon";
import AppAlert from "../Components/AppAlert";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
      //console.log("Success, Signed in");

      // Add a Toast on screen.
      AppToast.ToastDisplay("Signed in");

      updateAuthState("loggedIn");
    } catch (error) {
      //console.log(" Error signing in...", error);

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
        //Form must be reset before signIn is called
        //This is because signIn will lead to navigating the user to the homeScreen
        //Then try to update the form
        //but because the signIn screen will be unmounted react native wont know what to do
        resetForm();
        await signIn(values);
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
              <Text style={styles.headerText}>Harmony</Text>
              <Text style={styles.subtitle}>Sign in below</Text>
            </View>

            <View style={styles.body}>
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
                hideBorder={true}
                hideRightIcon={true}
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
                hideBorder={true}
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
                  Forgot Password?
                </Text>
              </View>
            </View>
            <View style={styles.footer}>
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
            </View>
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
    // backgroundColor: "#118AB2",
    backgroundColor: "#118AB2",
  },
  headerText: {
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
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    paddingVertical: 10,
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
    // color: "#cdedf6",
    fontSize: 19,
    fontWeight: "600",
  },
});
