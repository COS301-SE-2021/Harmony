import React from "react";
import {
  Text,
  Alert,
  View,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { Auth } from "aws-amplify";
import { SafeAreaView } from "react-native-safe-area-context";
import AppTextInput from "../Components/AppTextInput";
import AppButton from "../Components/AppButton";
import { AppToast } from "../Components/AppToast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SocialIcon } from "react-native-elements";
import * as Animatable from "react-native-animatable";

export default function SignIn({ navigation, updateAuthState }) {
  async function signIn(values) {
    try {
      await Auth.signIn(values.Username, values.Password);
      console.log("Success, Signed in");

      // Add a Toast on screen.
      AppToast.ToastDisplay("Signed in");

      updateAuthState("loggedIn");
    } catch (error) {
      console.log(" Error signing in...", error);
    }
  }

  return (
    <Formik
      initialValues={{
        Username: "",
        Password: "",
      }}
      onSubmit={(values) => signIn(values)}
      validationSchema={yup.object().shape({
        Username: yup
          .string()
          .min(2)
          .max(20)
          .required("Please, provide your Username!"),
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
              <Text style={styles.text_header}>Sign in to your account</Text>
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
                title="Login"
                disabled={!isValid}
                onPress={handleSubmit}
              />
              <View style={styles.footerTextContainer}>
                <Text style={styles.footerText}>
                  Don't have an account?
                  <Text
                    onPress={() => navigation.navigate("SignUp")}
                    style={styles.footerLink}
                  >
                    {" "}
                    Sign Up
                  </Text>
                </Text>
              </View>
            </Animatable.View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
              <SocialIcon type="facebook" />
              <SocialIcon type="google" />
            </Animatable.View>
          </View>
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
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
