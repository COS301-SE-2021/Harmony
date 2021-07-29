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
import { SocialIcon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import AppLoadingIcon from "../Components/AppLoadingIcon";

export default function SignUp({ navigation }) {
  //Using consts because im not sure how to destructure correctly
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function signUp(values) {
    try {
      setUsername(values.Username);
      setPassword(values.Password);
      setEmail(values.Email);
      setLoading(true);

      const { user } = await Auth.signUp({
        username,
        password,
        attributes: { email },
      });
      setLoading(false);

      //For some reason the authentication fails when the below logs are commented out
      //[ERROR] 03:12.667 AuthError - Username cannot be empty
      console.log(username);
      console.log(password);
      console.log(email);

      // console.log(user); //Output all user data

      console.log("Sign-up Confirmed");
      navigation.navigate("ConfirmSignUp");
    } catch (error) {
      console.log(" Error signing up...", error);
      setLoading(false);
    }
  }
  return (
    <Formik
      initialValues={{
        Username: "",
        Email: "",
        Password: "",
      }}
      onSubmit={(values) => signUp(values)}
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
          <View style={styles.container}>
            <StatusBar style="auto" />

            <View style={styles.header}>
              <Text style={styles.text_header}>Create an account</Text>
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
            </Animatable.View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
              <View style={styles.footerIcons}>
                <SocialIcon type="facebook" />
                <SocialIcon type="google" />
              </View>

              <View style={styles.footerTextContainer}>
                <Text style={styles.footerText}>
                  Already have an account?
                  <Text
                    onPress={() => navigation.navigate("SignIn")}
                    style={styles.signUpLink}
                  >
                    {" "}
                    Sign In
                  </Text>
                </Text>
              </View>
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
    fontSize: 19,
    fontWeight: "600",
  },
});