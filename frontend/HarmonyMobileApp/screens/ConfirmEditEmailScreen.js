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

export default function ConfirmEditEmailScreen({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [isErrorAlertVisible, setErrorAlertVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  async function confirmEditEmailScreen(values) {
    try {
      setLoading(true);
      setErrorAlertVisible(false);

      let user = await Auth.currentAuthenticatedUser();
      // Collect confirmation code
      let result = await Auth.verifyUserAttributeSubmit(
        user,
        "email",
        values.Code
      );
      (result);

      setLoading(false);

      // Add a Toast on screen.
      AppToast.ToastDisplay("Email changed");

      navigation.navigate("Edit Account Details", { refresh: true });
    } catch (error) {
      //setModalMessage must come before setErrorAlertVisible
      setModalMessage(error.message);
      setErrorAlertVisible(true);
      setLoading(false);
    }
  }

  return (
    <Formik
      initialValues={{
        Code: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        //Form must be reset before confirmEditEmailScreen is called
        resetForm();
        await confirmEditEmailScreen(values);
      }}
      validationSchema={yup.object().shape({
        Code: yup
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

            <Animatable.View
              animation="slideInRight"
              duration={300}
              style={styles.body}
            >
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
              <AppButton
                title="Submit"
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
