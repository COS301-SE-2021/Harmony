import React, { Component } from "react";
import {
  TextInput,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  View,
  StyleSheet,
  StatusBar,
} from "react-native";
import * as yup from "yup";
import { Formik } from "formik";

import { Auth } from "aws-amplify";
import { SafeAreaView } from "react-native-safe-area-context";
import AppTextInput from "../Components/AppTextInput";
import AppButton from "../Components/AppButton";
import { AppToast } from "../Components/AppToast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUp({ navigation }) {
  return (
    <Formik
      initialValues={{
        Username: "",
        Email: "",
        Password: "",
      }}
      onSubmit={(values) => Alert.alert(JSON.stringify(values))}
      validationSchema={yup.object().shape({
        Username: yup
          .string()
          .min(2)
          .max(20)
          .required("Please, provide your Username!"),
        Email: yup
          .string()
          .email("Invalid email")
          .required("Please, provide your Email!"),
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
          <StatusBar style="auto" />

          <View style={styles.container}>
            <Text style={styles.title}>Create a new account</Text>
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
              title="Sign Up"
              disabled={!isValid}
              onPress={handleSubmit}
            />
            <View style={styles.footerButtonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <Text style={styles.forgotPasswordButtonText}>
                  Already have an account? Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 50,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: "#202020",
    fontWeight: "500",
    marginVertical: 15,
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordButtonText: {
    color: "tomato",
    fontSize: 18,
    fontWeight: "600",
  },
});
