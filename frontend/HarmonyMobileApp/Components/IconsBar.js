import React, { useState } from "react";
import {
    StyleSheet,
    Pressable,
    View,

} from "react-native";
import { Text } from '@ui-kitten/components';
import {
    AntDesign,
} from "@expo/vector-icons";
import styles from "../styles";

export default function IconsBar({ dataSet, ...otherProps }) {
    const [favouriteIconChecked, setFavouriteIconChecked] = useState("unchecked");
    const [favouriteIconColor, setFavouriteIconColor] = useState("black");                   // controls the favourite heart color (pink/black)
    const [favouriteIconOutline, setFavouriteIconOutline] = useState("hearto");      // controls whether the heart is filled in or outlined
    const [upIconChecked, setUpIconChecked] = useState("unchecked");
    const [upIconColor, setUpIconColor] = useState("black");
    const [upIconOutline, setUpIconOutline] = useState("upcircleo");
    const [downIconChecked, setDownIconChecked] = useState("unchecked");
    const [downIconColor, setDownIconColor] = useState("black");
    const [downIconOutline, setDownIconOutline] = useState("downcircleo");

    handleDownIconPress = () => {
        if (upIconChecked == "unchecked") {
            if (downIconChecked == "unchecked") {
                setDownIconColor("#FF2727"),
                    setDownIconOutline("downcircle"),
                    console.log("pressed down checked"),
                    setDownIconChecked("checked");
            } else {
                setDownIconColor("black"),
                    setDownIconOutline("downcircleo"),
                    console.log("pressed down unchecked"),
                    setDownIconChecked("unchecked");
            }
        } else {
            setUpIconColor("black"),
                setUpIconOutline("upcircleo"),
                console.log("pressed up unchecked from else"),
                setUpIconChecked("unchecked"),
                setDownIconColor("#FF2727"),
                setDownIconOutline("downcircle"),
                console.log("pressed down checked from else "),
                setDownIconChecked("checked");
        }
    };

    handleUpIconPress = () => {
        if (downIconChecked == "unchecked") {
            if (upIconChecked == "unchecked") {
                setUpIconColor("#80CB41"),
                    setUpIconOutline("upcircle"),
                    console.log("pressed up checked"),
                    setUpIconChecked("checked");
            } else {
                setUpIconColor("black"),
                    setUpIconOutline("upcircleo"),
                    console.log("pressed up unchecked"),
                    setUpIconChecked("unchecked");
            }
        } else {
            setDownIconColor("black"),
                setDownIconOutline("downcircleo"),
                console.log("pressed down unchecked from else"),
                setDownIconChecked("unchecked"),
                setUpIconColor("#80CB41"),
                setUpIconOutline("upcircle"),
                console.log("pressed up checked from else"),
                setUpIconChecked("checked");
        }
    };

    handleFavouriteIconPress = () => {
        if (favouriteIconChecked == "unchecked") {
            setFavouriteIconColor("#FF2763"),
                setFavouriteIconOutline("heart"),
                console.log("pressed favourite checked"),
                setFavouriteIconChecked("checked");
        } else {
            setFavouriteIconColor("black"),
                setFavouriteIconOutline("hearto"),
                console.log("pressed favourite unchecked"),
                setFavouriteIconChecked("unchecked");
        }
    };

    return (
        <View style={styles.iconsBar}>
            <View style={{ flexDirection: "row" }}>
                <Pressable style={{ flexDirection: "row", justifyContent: "center" }} onPress={handleDownIconPress}>
                    <AntDesign name={downIconOutline} size={24} color={downIconColor} />
                    <Text style={{ paddingLeft: "2%", paddingRight: "5%", paddingVertical: "1%", fontFamily: "sans-serif-light" }}>{dataSet.Downvotes}</Text>
                </Pressable>
                <Pressable style={{ flexDirection: "row", justifyContent: "center", paddingRight: "10%" }} onPress={handleUpIconPress}>
                    <AntDesign name={upIconOutline} size={24} color={upIconColor} />
                    <Text style={{ paddingLeft: "2%", paddingVertical: "1%", fontFamily: "sans-serif-light", }}>{dataSet.Upvotes}</Text>
                </Pressable>

            </View>
            <Pressable onPress={handleFavouriteIconPress}>
                <AntDesign name={favouriteIconOutline} size={24} color={favouriteIconColor} />
            </Pressable>
        </View>
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
