import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Pressable,
} from "react-native";
import { Text } from '@ui-kitten/components';
import ReduxStore from "../Components/ReduxStore"

export default function FilterTag({ color, title, style, cleared, filterType, ...otherProps }) {

    const [filterColor, setFilterColor] = useState("#F3F2F2");
    const [filterTextColor, setTextColor] = useState("black");
    //variable gets set on load so its used to set the colours on load also
    const [load, setLoad] = useState(true);

    //use effect is a hook that detects when a variable is changed and will act when its changed
    useEffect(() => {
        const state = ReduxStore.getState();
        console.log("detect use effect " + filterType + " " + title)
        //cant be on its own so this leverages the fact that it reset to reset it again
        if ((state.MealTags.includes(title) && filterType == "mealTypes")
            || (state.DrinkTags.includes(title) && filterType == "drinks")
            || (state.FoodTags.includes(title) && filterType == "food")) {
            setFilterColor(color);
            setTextColor("white");
        }

    }, [load]);

    const checkTag = () => {
        ReduxStore.dispatch({
            type: "APPEND",
            //payload is the standard adopted name for the state value
            payload: { "tagName": title, "tagType": filterType }
        })

    };

    const uncheckTag = () => {
        ReduxStore.dispatch({
            type: "REMOVE",
            //payload is the standard adopted name for the state value
            payload: { "tagName": title, "tagType": filterType }
        })

    };

    const tagColor = () => {
        if (filterColor == "#F3F2F2") {
            setFilterColor(color);
            checkTag()
        }
        else {
            setFilterColor("#F3F2F2");
            uncheckTag()
        }

    };
    const textColor = () => {
        if (filterTextColor == "black") {
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
                //console.log("was pressed"),
                //  setClicked(true),
                tagColor(),
                textColor()
            )
            }
        >
            <Text style={[personalStyles.TextSmaller, { color: filterTextColor }]}>{title}</Text>

        </Pressable >
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
