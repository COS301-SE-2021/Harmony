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
import { SocialIcon } from "react-native-elements";

export default function RequestNewItemScreen({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [isErrorAlertVisible, setErrorAlertVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    return (

        <Formik
            initialValues={{
                Name: "",
                Description: "",
            }}
            onSubmit={async (values, { resetForm }) => {
                //Form must be reset before signIn is called
                //This is because signIn will lead to navigating the user to the homeScreen
                //Then try to update the form
                //but because the signIn screen will be unmounted react native wont know what to do
                resetForm();
                await signIn(values);
            }}
            validationSchema={yup.object().shape({
                Name: yup
                    .string()
                    .required("Please, provide the item name!"),
                Description: yup.string().required("Please, provide your item description!"),
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
                                value={values.Description}
                                onChangeText={handleChange("Description")}
                                placeholder="Enter Item Description"
                                autoCorrect={false}
                                onBlur={() => setFieldTouched("Description")}
                                // secureTextEntry={true}
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
                                title="Sign in"
                                disabled={!isValid}
                                onPress={handleSubmit}
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
