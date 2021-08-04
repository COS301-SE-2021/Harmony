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
        values.Code,
        values.Password
      );

      setLoading(false);
      //console.log("Success, Password changed");

      // Add a Toast on screen.
      AppToast.ToastDisplay("Password changed");

      navigation.navigate("SignIn");
    } catch (error) {
      //console.log(" Error resetting password...", error);
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
        Code: "",
        Password: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        //Form must be reset before confirmForgotPassword is called
        //This is because confirmForgotPassword will lead to navigating the user to the homeScreen
        //Then try to update the form
        //but because the confirmForgotPassword screen will be unmounted react native wont know what to do
        resetForm();
        await confirmForgotPassword(values);
      }}
      validationSchema={yup.object().shape({
        Username: yup
          .string()
          .min(2)
          .max(20)
          .matches(/^\S*$/, "Username may not contain spaces") //Contains no spaces
          .required("Please, provide your Username!"),
        Code: yup
          .string()
          .min(6)
          .max(6)
          .required("Please, provide your Authetication Code!"),
        Password: yup
          .string()
          .min(8)
          .required("Please, provide your Password!"),
        ConfirmPassword: yup
          .string()
          .when("Password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: yup
              .string()
              .oneOf([yup.ref("Password")], "Passwords do not match!"),
          })
          .required("Please, confirm your Password!"),
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
              <Text style={styles.headerText}>Reset your password</Text>
              <Text style={styles.subtitle}>
                Provide your details and the reset code sent to your account
                email below
              </Text>
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
                value={values.Code}
                onChangeText={handleChange("Code")}
                leftIcon="numeric"
                placeholder="Enter verification code"
                keyboardType="numeric"
                onBlur={() => setFieldTouched("Code")}
                error={errors.Code}
                touched={touched.Code}
                secureTextEntry={false}
              />
              {touched.Code && errors.Code && (
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                  {errors.Code}
                </Text>
              )}
              <AppTextInput
                value={values.Password}
                onChangeText={handleChange("Password")}
                leftIcon="lock"
                placeholder="Enter Password"
                autoCorrect={false}
                onBlur={() => setFieldTouched("Password")}
                error={errors.Password}
                touched={touched.Password}
                type="Password"
              />
              {touched.Password && errors.Password && (
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                  {errors.Password}
                </Text>
              )}
              <AppTextInput
                value={values.ConfirmPassword}
                onChangeText={handleChange("ConfirmPassword")}
                leftIcon="lock"
                placeholder="Confirm Password"
                autoCorrect={false}
                onBlur={() => setFieldTouched("ConfirmPassword")}
                error={errors.ConfirmPassword}
                touched={touched.ConfirmPassword}
                type="Password"
              />
              {touched.ConfirmPassword && errors.ConfirmPassword && (
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                  {errors.ConfirmPassword}
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
    paddingTop: 20,
    width: "90%",
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
