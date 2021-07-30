import React, { useState } from "react";
import { Text, View, StyleSheet, StatusBar, Platform } from "react-native";
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

export default function ConfirmForgotPassword({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [isErrorAlertVisible, setErrorAlertVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  async function confirmForgotPassword(values) {
    try {
      setLoading(true);
      setErrorAlertVisible(false);

      // Collect confirmation code and new password, then
      await Auth.forgotPasswordSubmit(
        values.Username,
        values.authCode,
        values.Password
      );

      setLoading(false);
      console.log("Success, Password changed");

      // Add a Toast on screen.
      AppToast.ToastDisplay("Password changed");

      navigation.navigate("SignIn");
    } catch (error) {
      console.log(" Error resetting password...", error);
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
        authCode: "",
        Password: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        await confirmForgotPassword(values);
        resetForm();
      }}
      validationSchema={yup.object().shape({
        Username: yup
          .string()
          .min(2)
          .max(20)
          .required("Please, provide your Username!"),
        authCode: yup
          .string()
          .min(6)
          .max(6)
          .required("Please, provide your Authetication Code!"),
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
              <Text style={styles.text_header}>Reset your password</Text>
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
                value={values.authCode}
                onChangeText={handleChange("authCode")}
                leftIcon="numeric"
                placeholder="Enter verification code"
                keyboardType="numeric"
                onBlur={() => setFieldTouched("authCode")}
                error={errors.authCode}
                touched={touched.authCode}
              />
              {touched.authCode && errors.authCode && (
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                  {errors.authCode}
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
                title="Save"
                disabled={!isValid}
                onPress={handleSubmit}
              />
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
  body: {
    alignItems: "center",
    flex: Platform.OS === "ios" ? 3 : 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
