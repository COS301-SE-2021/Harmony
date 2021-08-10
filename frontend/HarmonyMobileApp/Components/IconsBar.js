import React, { useState, useEffect } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import styles from "../styles";

// make api call with dataSet.PID
export default function IconsBar({
    dataSet,
    upVoteVal,
    downVoteVal,
}) {
    const [favouriteIconChecked, setFavouriteIconChecked] = useState("Unchecked");
    const [favouriteIconColor, setFavouriteIconColor] = useState("black"); // controls the favourite heart color (pink/black)
    const [favouriteIconOutline, setFavouriteIconOutline] = useState("hearto"); // controls whether the heart is filled in or outlined

    const [upIconChecked, setUpIconChecked] = useState("");
    const [upIconColor, setUpIconColor] = useState("black");
    const [upIconOutline, setUpIconOutline] = useState("upcircleo");

    const [downIconChecked, setDownIconChecked] = useState("");
    const [downIconColor, setDownIconColor] = useState("black");
    const [downIconOutline, setDownIconOutline] = useState("downcircleo");

    const [upvote, setUpvote] = useState(upVoteVal);
    const [downvote, setDownvote] = useState(downVoteVal);

    const voteURL = "https://duj0glvi9d.execute-api.eu-west-1.amazonaws.com/dev";
    const addToFavURL = "https://bqwmc4qpkd.execute-api.eu-west-1.amazonaws.com/dev";
    const removeFromFavURL = "https://blzyl8bowc.execute-api.eu-west-1.amazonaws.com/dev";
    useEffect(() => {
        if (upIconChecked != "") {//If the value has been set
            vote("Upvotes", upIconChecked);
        }
    }, [upIconChecked]);

    useEffect(() => {
        if (downIconChecked != "") {//If the value has been set
            vote("Downvotes", downIconChecked);
        }
    }, [downIconChecked]);

    //Upvotes or Downvotes depending on the button clicked
    const vote = async (VoteType, iconChecked) => {
        await fetch(voteURL, {
            method: "POST",
            body: JSON.stringify({
                UID: "u1",
                PID: dataSet.PID,
                VoteType: VoteType,
                IsChecked: iconChecked,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                if (VoteType == "Downvotes") {
                    if (json.Downvotes) {
                        setDownvote(json.Downvotes);
                    }
                } else if (VoteType == "Upvotes") {
                    if (json.Upvotes) {
                        setUpvote(json.Upvotes);
                    }
                }
            })
            .catch((error) => alert(error));
    };


    useEffect(() => {
        if (favouriteIconChecked == "Checked") {
            addRemoveFavourites(addToFavURL);
        } else {
            addRemoveFavourites(removeFromFavURL);
        }
    }, [favouriteIconChecked]);

    //Adds and removes pairings from user favourites
    const addRemoveFavourites = async (URL) => {
        fetch(URL, {
            method: "POST",
            body: JSON.stringify({
                UID: "u1",
                PID: dataSet.PID,
            }),
        })
            .then((response) => response.json())
            .catch((error) => alert(error));

    };
    handleDownIconPress = () => {
        if (upIconChecked == "Unchecked" || upIconChecked == "") {
            if (downIconChecked == "Unchecked" || downIconChecked == "") {
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
        if (downIconChecked == "Unchecked" || downIconChecked == "") {
            if (upIconChecked == "Unchecked" || upIconChecked == "") {
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
                    <AntDesign name={downIconOutline} size={24} color={downIconColor} />
                    {/* <Text style= {[personalStyles.dataText, { paddingRight: "5%" }]}>{dataSet.Downvotes}</Text> */}
                    <Text style={[personalStyles.dataText, { paddingRight: "5%" }]}>
                        {downvote}
                    </Text>
                </Pressable>

                <Pressable
                    style={[styles.flexRowJustCenter, { paddingRight: "10%" }]}
                    onPress={handleUpIconPress}
                >
                    <AntDesign name={upIconOutline} size={24} color={upIconColor} />

                    {/* <Text style={personalStyles.dataText}>{dataSet.Upvotes}</Text> */}
                    <Text style={personalStyles.dataText}>{upvote}</Text>
                </Pressable>
            </View>
            <Pressable onPress={handleFavouriteIconPress}>
                <AntDesign
                    name={favouriteIconOutline}
                    size={24}
                    color={favouriteIconColor}
                />
            </Pressable>
        </View>
    );
}

const personalStyles = StyleSheet.create({
    dataText: {
        paddingLeft: "2%",
        paddingVertical: "1%",
        fontFamily: "sans-serif-light",
    },
});
