import React, { useState } from "react";
import { Text, View, StyleSheet, StatusBar, Platform } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { Auth } from "aws-amplify";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";

import AppTextInput from "../Components/AppTextInput";
import AppButton from "../Components/AppButton";
import { AppToast } from "../Components/AppToast";
import AppLoadingIcon from "../Components/AppLoadingIcon";
import AppAlert from "../Components/AppAlert";

export default function ForgotPassword({ navigation, updateAuthState }) {
  const [isLoading, setLoading] = useState(false);
  const [isErrorAlertVisible, setErrorAlertVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  async function forgotPassword(values) {
    try {
      setLoading(true);
      setErrorAlertVisible(false);

      await Auth.forgotPassword(values.Username);
      setLoading(false);
      console.log("Email sent");

      // Add a Toast on screen.
      AppToast.ToastDisplay("Email sent");

      navigation.navigate("ConfirmForgotPassword");
    } catch (error) {
      console.log(" Error sending password reset code...", error);
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
      }}
      onSubmit={async (values, { resetForm }) => {
        await forgotPassword(values);
        resetForm();
      }}
      validationSchema={yup.object().shape({
        Username: yup
          .string()
          .min(2)
          .max(20)
          .matches(/^\S*$/, "Username may not contain spaces") //Contains no spaces
          .required("Please, provide your Username!"),
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
              <Text style={styles.text_header}>Forgot Password?</Text>
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
              <AppButton
                title="Reset password"
                disabled={!isValid}
                onPress={handleSubmit}
              />
              <View style={styles.footerTextContainer}>
                <Text style={styles.footerText}>
                  Not working?
                  <Text
                    onPress={() => navigation.navigate("SignUp")}
                    style={styles.footerLink}
                  >
                    {" "}
                    Try another way
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
    backgroundColor: "#118AB2",
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
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  footerTextContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#2e2e2d",
    fontSize: 18,
    fontWeight: "600",
  },
  footerLink: {
    color: "#788eec",
    fontSize: 19,
    fontWeight: "600",
  },
});
