import React, { useState } from "react";
import {
    StyleSheet,
    Pressable,
} from "react-native";
import { Text } from '@ui-kitten/components';

export default function Icons({ iconName, filledInColor, ...otherProps }) {
    const [color, setColor] = useState(false);

    handlePress = () => {
        setClicked(!clicked)
    };

    const tagColor = () => {
        if (clicked) {
            return {
                backgroundColor: color,
            };
        }
        else {
            return {
                backgroundColor: "#F3F2F2",
            };
        }
    };
    const textColor = () => {
        if (clicked) {
            return {
                color: "white"
            };
        }
        else {
            return {
                color: "black"
            };
        }
    };
    return (
        <AntDesign name={iconName} size={24} color={downIconColor} />

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
