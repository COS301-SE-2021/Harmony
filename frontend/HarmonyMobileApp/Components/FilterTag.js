import React, { useState } from "react";
import {
    StyleSheet,
    Pressable,
} from "react-native";
import { Text } from '@ui-kitten/components';
import { set } from "react-native-reanimated";

export default function FilterTag({ color, title, style, cleared, ...otherProps }) {
    const [clicked, setClicked] = useState(false);
    const [filterColor, setFilterColor] = useState("#F3F2F2");
    const [filterTextColor, setTextColor] = useState("black");
    handlePress = () => {
        setClicked(!clicked)
    };

    const tagColor = () => {
        if (clicked && !cleared) {
            setFilterColor(color);
        }
        else {
            setFilterColor("#F3F2F2");
        }
    };
    const textColor = () => {
        if (clicked && !cleared) {
            setTextColor("white")
        }
        else {
            setTextColor("black")
        }
    };
    return (
        <Pressable
            style={[personalStyles.filterTag, { backgroundColor: filterColor }]}
            onPress={() => (//if i put this in a seperate function it only calls snack instead of the one pressed,
                setClicked(!clicked),
                tagColor(), textColor())}
        >
            <Text style={[personalStyles.TextSmaller, { color: filterTextColor }]}>{title}</Text>

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
