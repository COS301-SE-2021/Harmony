import React, { useState } from "react";
import { Text, View, StyleSheet, StatusBar, Platform } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { Auth } from "aws-amplify";
import AppTextInput from "../Components/AppTextInput";
import AppButton from "../Components/AppButton";
import { AppToast } from "../Components/AppToast";
import AppAlert from "../Components/AppAlert";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SocialIcon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import AppLoadingIcon from "../Components/AppLoadingIcon";

export default function EditEmailScreen({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [isErrorAlertVisible, setErrorAlertVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  async function signUp(values) {
    try {
      setLoading(true);
      setErrorAlertVisible(false);

      const { user } = await Auth.signUp({
        username: values.Username,
        password: values.Password,
        attributes: { email: values.Email },
      });
      setLoading(false);

      // console.log(values.Username);
      // console.log(values.Password);
      // console.log(values.Email);
      // console.log(user); //Output all user data

      //console.log("Sign-up Confirmed");
      // Add a Toast on screen.
      AppToast.ToastDisplay("Email sent");

      navigation.navigate("Settings");
    } catch (error) {
      //console.log(" Error signing up...", error);
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
        Email: "",
      }}
      onSubmit={(values) => signUp(values)}
      onSubmit={async (values, { resetForm }) => {
        //Form must be reset before signUp is called
        //This is because signUp will lead to navigating the user to the homeScreen
        //Then try to update the form
        //but because the signUp screen will be unmounted react native wont know what to do
        resetForm();
        await signUp(values);
      }}
      validationSchema={yup.object().shape({
        Username: yup
          .string()
          .min(2)
          .max(20)
          .matches(/^\S*$/, "Username may not contain spaces") //Contains no spaces
          .required("Please, provide your Username!"),
        Email: yup
          .string()
          .email("Invalid email")
          .required("Please, provide your Email!"),
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

            <Animatable.View
              animation="slideInRight"
              duration={300}
              style={styles.body}
            >
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
                value={values.Email}
                onChangeText={handleChange("Email")}
                onBlur={() => setFieldTouched("Email")}
                leftIcon="email"
                placeholder="Enter Email"
                keyboardType="email-address"
                textContentType="emailAddress"
                error={errors.Email}
                touched={touched.Email}
              />
              {touched.Email && errors.Email && (
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                  {errors.Email}
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
  },
  body: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
