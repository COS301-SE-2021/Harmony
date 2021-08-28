import React from "react";
import { useNavigation } from '@react-navigation/native';
import { FAB } from 'react-native-paper';
import styles from "../styles";

//FAB: Floating action button
export default function FABNew() {
    const navigation = useNavigation();

    return (
        <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => navigation.navigate("NewPairing")}
        />
    );
}


