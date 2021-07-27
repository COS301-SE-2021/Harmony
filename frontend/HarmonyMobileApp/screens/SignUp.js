import React, { Component } from "react";
import {
  TextInput,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  View,
  StyleSheet,
} from "react-native";
import * as yup from "yup";
import { Formik } from "formik";

import { Auth } from "aws-amplify";
import { SafeAreaView } from "react-native-safe-area-context";
import AppTextInput from "../Components/AppTextInput";
import AppButton from "../Components/AppButton";
import { AppToast } from "../Components/AppToast";
export default function SignUp({ navigation }) {
  const inputStyle = {
    borderWidth: 1,
    borderColor: "#4e4e4e",
    padding: 12,
    marginBottom: 5,
  };

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
          .min(2, "Too Short!")
          .max(50, "Too Long!")
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
        <View style={styles.container}>
          <Text style={styles.title}>Create a new account</Text>
          <AppTextInput
            value={values.Username}
            onChangeText={handleChange("Username")}
            onBlur={() => setFieldTouched("Username")}
            leftIcon="account"
            placeholder="Enter Username"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
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
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
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
            autoCapitalize="none"
            autoCorrect={false}
            onBlur={() => setFieldTouched("Password")}
            secureTextEntry={true}
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
    // backgroundColor: "red",
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

// console.disableYellowBox = true;
