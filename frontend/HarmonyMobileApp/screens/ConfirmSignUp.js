import React, { useState } from "react";
import { Text, View, StyleSheet, StatusBar, Platform } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { Auth } from "aws-amplify";
import { SafeAreaView } from "react-native-safe-area-context";
import AppTextInput from "../Components/AppTextInput";
import AppButton from "../Components/AppButton";
import { AppToast } from "../Components/AppToast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
import AppLoadingIcon from "../Components/AppLoadingIcon";

export default function ConfirmSignUp({ navigation }) {
  const [isLoading, setLoading] = useState(false);

  async function confirmSignUp(values) {
    try {
      setLoading(true);

      await Auth.confirmSignUp(values.Username, values.authCode);
      setLoading(false);

      console.log(" Code confirmed");
      navigation.navigate("SignIn");

      // Add a Toast on screen.
      AppToast.ToastDisplay("Success");
    } catch (error) {
      console.log(
        " Verification code does not match. Please enter a valid verification code.",
        error.code
      );
      setLoading(false);
    }
  }

  return (
    <Formik
      initialValues={{
        Username: "",
        authCode: "",
      }}
      onSubmit={(values) => confirmSignUp(values)}
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
              <Text style={styles.text_header}>Confirm Sign Up</Text>
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
              <AppButton
                title="Confirm Sign Up"
                disabled={!isValid}
                onPress={handleSubmit}
              />
            </Animatable.View>
          </View>
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
