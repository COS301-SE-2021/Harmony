import React, { useState } from "react";
import {
    StyleSheet,
    Pressable,
} from "react-native";
import { Text } from '@ui-kitten/components';

export default function FilterTag({ color, title, ...otherProps }) {
    const [clicked, setClicked] = useState(false);

    var grey = "#F3F2F2";

    handlePress = () => {
        console.log("hello from " + title);
        setClicked(!clicked)
    };

    const tagColor = () => {
        if (clicked) {
            return {
                backgroundColor: color
            };
        }
        else {
            return {
                backgroundColor: "#F3F2F2"
            };
        }
    };

    return (
        <Pressable
            style={[personalStyles.filterTag, tagColor()]}
            onPress={() => (console.log("hello from " + title),
                setClicked(!clicked))}
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
