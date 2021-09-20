import React, { useState } from "react";
import { Text, View, StyleSheet, StatusBar, Platform } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";

import AppTextInput from "../Components/AppTextInput";
import AppButton from "../Components/AppButton";
import { AppToast } from "../Components/AppToast";
import AppLoadingIcon from "../Components/AppLoadingIcon";
import AppAlert from "../Components/AppAlert";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function RequestNewItemScreen({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [isErrorAlertVisible, setErrorAlertVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const REQUEST_ITEM_URL =
        "https://2928u23tv1.execute-api.eu-west-1.amazonaws.com/dev/requestnewitem";

    async function submitRequest(values) {
        setLoading(true);
        setErrorAlertVisible(false);

        await fetch(REQUEST_ITEM_URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "Name": values.Name,
                "Description": values.Description
            })
        })
            .then((response) => response.json())
            .then((json) => handleResponse(json))
            .catch((error) => {
                //setModalMessage must come before setErrorAlertVisible
                setModalMessage(error.message);
                setErrorAlertVisible(true);
                setLoading(false);
            })

        // Add a Toast on screen.
        AppToast.ToastDisplay("Item request submitted");

    }

    const handleResponse = (json) => {
        if (json.StatusCode === 200) {
            setErrorAlertVisible(false);
            setLoading(false);
            navigation.goBack()

        }
        else if (json.StatusCode === 400) {
            setLoading(false);
            //setModalMessage must come before setErrorAlertVisible
            setModalMessage(json.Data);
            setErrorAlertVisible(true);
        }
    }
    return (

        <Formik
            initialValues={{
                Name: "",
                Description: "",
            }}
            onSubmit={async (values, { resetForm }) => {
                //Form must be reset before submitRequest is called
                //This is because submitRequest will lead to navigating the user to the homeScreen
                //Then try to update the form
                //but because the submitRequest screen will be unmounted react native wont know what to do
                resetForm();
                await submitRequest(values);
            }}
            validationSchema={yup.object().shape({
                Name: yup
                    .string()
                    .matches(/^[A-Za-z\s]+$/, "Item name may only contain alphabetic characters") //Includes spaces
                    .required("Please, provide the item name!"),
                Description: yup
                    .string()
                    .matches(/^[A-Za-z.,;'"\s]+$/, "Item name description may only contain valid characters such as A-Za-z.,;'\"") //Includes spaces
                    .required("Please, provide your item description!"),
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
                            <Text style={styles.headerText}>Request a new item</Text>
                            <Text style={styles.subtitle}>Fill in the fields below</Text>
                        </View>

                        <View style={styles.body}>
                            <AppTextInput
                                leftIcon="food-apple"
                                value={values.Name}
                                onChangeText={handleChange("Name")}
                                onBlur={() => setFieldTouched("Name")}
                                placeholder="Enter Item Name"
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                error={errors.Name}
                                touched={touched.Name}
                            />
                            {/* If the user has clicked on the input field and it is not valid */}
                            {touched.Name && errors.Name && (
                                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                                    {errors.Name}
                                </Text>
                            )}
                            <AppTextInput
                                leftIcon="card-text"
                                value={values.Description}
                                onChangeText={handleChange("Description")}
                                placeholder="Enter Item Description"
                                autoCorrect={false}
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                multiline={true}

                                onBlur={() => setFieldTouched("Description")}
                                error={errors.Description}
                                touched={touched.Description}
                                type="Description"
                            />
                            {touched.Description && errors.Description && (
                                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                                    {errors.Description}
                                </Text>
                            )}

                            <AppButton
                                title="Submit"
                                disabled={!isValid}
                                onPress={handleSubmit}
                            />

                            <AppButton
                                title="Cancel"
                                disabled={false}
                                onPress={navigation.goBack}
                            />
                        </View>

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
        backgroundColor: "#118AB2",
    },
    headerText: {
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
    subtitle: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
        paddingVertical: 10,
    },
    body: {
        alignItems: "center",
        flex: Platform.OS === "ios" ? 3 : 1,
        backgroundColor: "#fff",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    }
});
