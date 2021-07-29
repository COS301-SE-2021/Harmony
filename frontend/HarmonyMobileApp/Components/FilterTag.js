import React from "react";
import {
    StyleSheet,
    Pressable,
} from "react-native";
import { Text } from '@ui-kitten/components';

export default function FilterTag({ clicked, color, title, ...otherProps }) {
    var grey = "#F3F2F2";
    var background = grey;

    handlePress = () => {
        background = color
    };

    return (
        <Pressable
            style={[personalStyles.filterTag, { backgroundColor: background }]}
            onPress={handlePress()}
        >
            <Text style={personalStyles.TextSmaller}>{title}</Text>

        </Pressable>
    );
};

const personalStyles = StyleSheet.create({

    filterTag: {
        borderRadius: 10,
        padding: 4,
        height: 30,
        margin: 2,
        paddingHorizontal: 20
    },
    TextSmaller: {
        //used for text in filter
        fontFamily: "sans-serif-light",
        fontSize: 14,
        textAlignVertical: "center"
    },
});
