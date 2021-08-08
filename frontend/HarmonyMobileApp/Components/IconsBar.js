import React, { useState, useEffect } from "react";
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
    const [favouriteIconChecked, setFavouriteIconChecked] = useState("Unchecked");
    const [favouriteIconColor, setFavouriteIconColor] = useState("black");                   // controls the favourite heart color (pink/black)
    const [favouriteIconOutline, setFavouriteIconOutline] = useState("hearto");      // controls whether the heart is filled in or outlined

    const [upIconChecked, setUpIconChecked] = useState("Unchecked");
    const [upIconColor, setUpIconColor] = useState("black");
    const [upIconOutline, setUpIconOutline] = useState("upcircleo");

    const [downIconChecked, setDownIconChecked] = useState("Unchecked");
    const [downIconColor, setDownIconColor] = useState("black");
    const [downIconOutline, setDownIconOutline] = useState("downcircleo");

    const [data, setData] = useState([]);
    useEffect(() => {
        console.log("use effect up triggered " + dataSet.PID + " " + upIconChecked);
        fetch("https://56kdfhsnac.execute-api.eu-west-1.amazonaws.com/dev", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "UID": "u1",
                "PID": dataSet.PID,
                "VoteType": "Upvotes",
                "IsChecked": upIconChecked
            })
        })
            .then((response) => response.json())
            .then((json) => setData(json))
            .then(console.log(data))
            .catch((error) => alert(error));

    }, [upIconChecked]);

    useEffect(() => {
        console.log("use effect down triggered " + dataSet.PID + " " + downIconChecked);
        fetch("https://56kdfhsnac.execute-api.eu-west-1.amazonaws.com/dev", {
            method: "POST",
            body: JSON.stringify({
                "UID": "u1",
                "PID": dataSet.PID,
                "VoteType": "Downvotes",
                "IsChecked": downIconChecked
            })
        })
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => alert(error));
        console.log(data);

    }, [downIconChecked]);


    useEffect(() => {
        console.log("use effect fav triggered " + dataSet.PID + " " + favouriteIconChecked);
        if (favouriteIconChecked == "Checked") {
            fetch("https://bqwmc4qpkd.execute-api.eu-west-1.amazonaws.com/dev", {
                method: "POST",
                body: JSON.stringify({
                    "UID": "u1",
                    "PID": dataSet.PID,
                })
            })
                .then((response) => response.json())
                .then((json) => setData(json))
                .catch((error) => alert(error));
            console.log(data);
        }
        else {
            fetch("https://blzyl8bowc.execute-api.eu-west-1.amazonaws.com/dev", {
                method: "POST",
                body: JSON.stringify({
                    "UID": "u1",
                    "PID": dataSet.PID,
                })
            })
                .then((response) => response.json())
                .then((json) => setData(json))
                .catch((error) => alert(error));
            console.log(data);

        }

    }, [favouriteIconChecked]);

    handleDownIconPress = () => {
        if (upIconChecked == "Unchecked") {
            if (downIconChecked == "Unchecked") {
                setDownIconColor("#FF2727");
                setDownIconOutline("downcircle");
                setDownIconChecked("Checked");
            } else {
                setDownIconColor("black");
                setDownIconOutline("downcircleo");
                setDownIconChecked("Unchecked");
            }
        } else {
            // uncheck up and then check down
            setUpIconColor("black");
            setUpIconOutline("upcircleo");
            setUpIconChecked("Unchecked");

            setDownIconColor("#FF2727");
            setDownIconOutline("downcircle");
            setDownIconChecked("Checked");
        }
    };

    handleUpIconPress = () => {
        if (downIconChecked == "Unchecked") {
            if (upIconChecked == "Unchecked") {
                setUpIconColor("#80CB41");
                setUpIconOutline("upcircle");
                setUpIconChecked("Checked");
            } else {
                setUpIconColor("black");
                setUpIconOutline("upcircleo");
                setUpIconChecked("Unchecked");
            }
        } else {
            // uncheck down then check up
            setDownIconColor("black");
            setDownIconOutline("downcircleo");
            setDownIconChecked("Unchecked");

            setUpIconColor("#80CB41");
            setUpIconOutline("upcircle");
            setUpIconChecked("Checked");
        }
    };

    handleFavouriteIconPress = () => {
        if (favouriteIconChecked == "Unchecked") {
            setFavouriteIconColor("#FF2763");
            setFavouriteIconOutline("heart");
            setFavouriteIconChecked("Checked");
        } else {
            setFavouriteIconColor("black");
            setFavouriteIconOutline("hearto");
            setFavouriteIconChecked("Unchecked");
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
