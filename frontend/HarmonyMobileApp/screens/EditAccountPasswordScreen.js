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
  async function changePassword(values) {
    try {
      setLoading(true);
      setErrorAlertVisible(false);

      Auth.currentAuthenticatedUser()
        .then((user) => {
          return Auth.changePassword(user, values.OldPassword, values.Password);
        })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));

      setLoading(false);

      // Add a Toast on screen.
      AppToast.ToastDisplay("Password changed");

      navigation.navigate("Edit Account Details");
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
        OldPassword: "",
        Password: "",
        ConfirmPassword: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        //Form must be reset before changePassword is called
        resetForm();
        await changePassword(values);
      }}
      validationSchema={yup.object().shape({
        OldPassword: yup
          .string()
          .min(8)
          .required("Please, provide your Password!"),
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
                value={values.OldPassword}
                onChangeText={handleChange("OldPassword")}
                leftIcon="lock"
                placeholder="Enter Old Password"
                autoCorrect={false}
                onBlur={() => setFieldTouched("OldPassword")}
                error={errors.OldPassword}
                touched={touched.OldPassword}
                type="Password"
              />
              {touched.OldPassword && errors.OldPassword && (
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                  {errors.OldPassword}
                </Text>
              )}
              <AppTextInput
                value={values.Password}
                onChangeText={handleChange("Password")}
                leftIcon="lock"
                placeholder="Enter New Password"
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
                placeholder="Confirm New Password"
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
