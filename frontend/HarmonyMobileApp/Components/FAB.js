import React from "react";

import { StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

//FAB: Floating action button
export default function FAB() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("NewPairing")}>
            <Feather name="plus" size={30} color="white" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#03A9F4',
        borderRadius: 30,
        elevation: 8
    }
});
