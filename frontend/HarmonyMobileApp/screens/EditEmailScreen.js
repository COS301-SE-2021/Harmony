import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
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

export default function EditEmailScreen({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [isErrorAlertVisible, setErrorAlertVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    Auth.currentAuthenticatedUser({}) //Get user information
      .then((data) => {
        setEmail(data.attributes.email);
      })
      .catch((err) => console.log(err));
  });

  async function editEmail(values) {
    try {
      setLoading(true);
      setErrorAlertVisible(false);

      const user = await Auth.currentAuthenticatedUser();
      const result = await Auth.updateUserAttributes(user, {
        email: values.Email,
      });
      //console.long(result);

      setLoading(false);

      // Add a Toast on screen.
      AppToast.ToastDisplay("Email sent");

      navigation.navigate("Confirm Edit Email");
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
        Username: "",
        Email: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        //Form must be reset before editEmail is called
        resetForm();
        await editEmail(values);
      }}
      validationSchema={yup.object().shape({
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
          <View style={[styles.container, styles.body]}>
            <StatusBar style="auto" />

            <View style={styles.list}>
              <Text style={[styles.listText, styles.placeholderText]}>
                Current email
              </Text>
              <Text style={styles.listText}>{email}</Text>
            </View>
            <AppTextInput
              value={values.Email}
              onChangeText={handleChange("Email")}
              onBlur={() => setFieldTouched("Email")}
              leftIcon="email"
              placeholder="Enter new email"
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
              title="Verify new email"
              disabled={!isValid}
              onPress={handleSubmit}
            />
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
  list: {
    padding: 20,
    marginTop: 1,
    // backgroundColor: "red",
    width: "100%",
  },
  listText: {
    fontSize: 18,
  },
  placeholderText: {
    color: "#888",
    marginBottom: 10,
  },
});
