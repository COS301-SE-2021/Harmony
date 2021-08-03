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

// make api call with dataSet.PID
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
                setDownIconColor("#FF2727");
                setDownIconOutline("downcircle");
                setDownIconChecked("checked");
            } else {
                setDownIconColor("black");
                setDownIconOutline("downcircleo");
                console.log("pressed down unchecked");
                setDownIconChecked("unchecked");
            }
        } else {
            // uncheck up and then check down
            setUpIconColor("black");
            setUpIconOutline("upcircleo");
            setUpIconChecked("unchecked");

            setDownIconColor("#FF2727");
            setDownIconOutline("downcircle");
            setDownIconChecked("checked");
        }
    };

    handleUpIconPress = () => {
        if (downIconChecked == "unchecked") {
            if (upIconChecked == "unchecked") {
                setUpIconColor("#80CB41");
                setUpIconOutline("upcircle");
                setUpIconChecked("checked");
            } else {
                setUpIconColor("black");
                setUpIconOutline("upcircleo");
                setUpIconChecked("unchecked");
            }
        } else {
            // uncheck down then check up
            setDownIconColor("black");
            setDownIconOutline("downcircleo");
            setDownIconChecked("unchecked");

            setUpIconColor("#80CB41");
            setUpIconOutline("upcircle");
            setUpIconChecked("checked");
        }
    };

    handleFavouriteIconPress = () => {
        if (favouriteIconChecked == "unchecked") {
            setFavouriteIconColor("#FF2763");
            setFavouriteIconOutline("heart");
            setFavouriteIconChecked("checked");
        } else {
            setFavouriteIconColor("black");
            setFavouriteIconOutline("hearto");
            setFavouriteIconChecked("unchecked");
        }
    };

    return (
        <View style={styles.iconsBar}>
            <View style={styles.flexRow}>
                <Pressable
                    style={styles.flexRowJustCenter}
                    onPress={handleDownIconPress}
                >
                    <AntDesign
                        name={downIconOutline}
                        size={24}
                        color={downIconColor}
                    />
                    <Text style={[personalStyles.dataText, { paddingRight: "5%" }]}>{dataSet.Downvotes}</Text>

                </Pressable>

                <Pressable
                    style={[styles.flexRowJustCenter, { paddingRight: "10%" }]}
                    onPress={handleUpIconPress}
                >
                    <AntDesign
                        name={upIconOutline}
                        size={24}
                        color={upIconColor}
                    />

                    <Text style={personalStyles.dataText}>{dataSet.Upvotes}</Text>
                </Pressable>

            </View>
            <Pressable onPress={handleFavouriteIconPress}>
                <AntDesign name={favouriteIconOutline} size={24} color={favouriteIconColor} />
            </Pressable>
        </View>
    );
};

const personalStyles = StyleSheet.create({

    dataText: {
        paddingLeft: "2%",
        paddingVertical: "1%",
        fontFamily: "sans-serif-light"
    }

});
