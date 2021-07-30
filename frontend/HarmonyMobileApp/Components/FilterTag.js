import React, { useState } from "react";
import {
    StyleSheet,
    Pressable,
} from "react-native";
import { Text } from '@ui-kitten/components';

export default function FilterTag({ color, title, ...otherProps }) {
    const [clicked, setClicked] = useState(false);

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
        <Pressable
            style={[personalStyles.filterTag, tagColor()]}
            onPress={() => (//if i put this in a seperate function it only calls snack instead of the one pressed,
                setClicked(!clicked)
            )}
        >
            <Text style={[personalStyles.TextSmaller, textColor()]}>{title}</Text>

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
