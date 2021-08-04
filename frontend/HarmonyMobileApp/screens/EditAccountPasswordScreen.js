import React, { useState } from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { Auth } from "aws-amplify";
import AppTextInput from "../Components/AppTextInput";
import AppButton from "../Components/AppButton";
import { AppToast } from "../Components/AppToast";
import AppAlert from "../Components/AppAlert";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
import AppLoadingIcon from "../Components/AppLoadingIcon";

export default function EditAccountPasswordScreen({ navigation }) {
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

      navigation.navigate("ConfirmSignUp");
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
        Password: "",
        ConfirmPassword: "",
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
  },
  body: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
