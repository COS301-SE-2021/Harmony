import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Pressable,
} from "react-native";
import { Text } from '@ui-kitten/components';
import ReduxStore from "../Components/ReduxStore"

export default function FilterTag({ color, title, style, cleared, filterType, ...otherProps }) {
    const state = ReduxStore.getState();

    const [filterColor, setFilterColor] = useState("#F3F2F2");
    const [filterTextColor, setTextColor] = useState("black");
    const [load, setLoad] = useState(true);
    //use effect is a hook that detects when a variable is changed and will act when its changed
    useEffect(() => {
        console.log("load set " + title);
        //cant be on its own so this leverages the fact that it reset to reset it again
        if (state.Checked.includes(title)) {
            console.log("checked contains " + title);
            setFilterColor(color);
            setTextColor("white");
        }
    }, [load]);



    const tagColor = () => {
        if (filterColor == "#F3F2F2") {
            setFilterColor(color);
        }
        else {
            setFilterColor("#F3F2F2");
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
                textColor(),
                ReduxStore.dispatch({
                    type: "APPEND",
                    //payload is the standard adopted name for the state value
                    payload: title
                })
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
