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
    isDV,
    isUV,
    isF,
    ...otherProps
}) {
    const [favouriteIconChecked, setFavouriteIconChecked] = useState("");
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

    // const [isUp, setIsUp] = useState(isUV);
    // const [isDown, setIsDown] = useState(isDV);
    // const [isFave, setIsFave] = useState(isF);

    const voteURL = "https://duj0glvi9d.execute-api.eu-west-1.amazonaws.com/dev";
    const addToFavURL = "https://bqwmc4qpkd.execute-api.eu-west-1.amazonaws.com/dev";
    const removeFromFavURL = "https://blzyl8bowc.execute-api.eu-west-1.amazonaws.com/dev";

    const [load, setLoad] = useState(true);

    useEffect(() => {
        //      console.log(load + " load var")
        // console.log("prev votes " + dataSet.isUpvoted + " " + dataSet.isDownvoted + " " + dataSet.isFavourited);
        // console.log(dataSet);
        //  test();
        if (load) {
            setLoad(false);

            if (dataSet.isUpvoted == "True") {
                setUpIconColor("#80CB41");
                setUpIconOutline("upcircle");
                setUpIconChecked("Checked");
            }
            if (dataSet.isDownvoted == "True") {
                setDownIconColor("#FF2727");
                setDownIconOutline("downcircle");
                setDownIconChecked("Checked");
            }
            if (dataSet.isFavourited == "True") {
                setFavouriteIconColor("#FF2763");
                setFavouriteIconOutline("heart");
                setFavouriteIconChecked("Checked");
            }
        }
    }, []);

    // const test = () => {
    //     console.log("in test " + isUp + " " + isDown + " " + isFave);
    // }
    useEffect(() => {
        if (upIconChecked != "") {//If the value has been set
            vote("Upvotes", upIconChecked);
        }
    }, [upIconChecked]);

    useEffect(() => {
        if (downIconChecked != "") {//If the value has been set
            vote("Downvotes", downIconChecked);
        };
        //  console.log(dataSet);
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
        } else if (favouriteIconChecked == "Unchecked") {
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

    const uncheckDownvote = () => {
        setDownIconColor("black");
        setDownIconOutline("downcircleo");
        setDownIconChecked("Unchecked");
    }
    const checkDownvote = () => {
        setDownIconColor("#FF2727");
        setDownIconOutline("downcircle");
        setDownIconChecked("Checked");
    }
    const checkUpvote = () => {
        setUpIconColor("#80CB41");
        setUpIconOutline("upcircle");
        setUpIconChecked("Checked");
    }
    const uncheckUpvote = () => {
        setUpIconColor("black");
        setUpIconOutline("upcircleo");
        setUpIconChecked("Unchecked");
    }
    const checkFavourite = () => {
        setFavouriteIconColor("#FF2763");
        setFavouriteIconOutline("heart");
        setFavouriteIconChecked("Checked");
    }
    const uncheckFavourite = () => {
        setFavouriteIconColor("black");
        setFavouriteIconOutline("hearto");
        setFavouriteIconChecked("Unchecked");
    }

    handleDownIconPress = () => {
        if (upIconChecked == "Unchecked" || upIconChecked == "") {
            if (downIconChecked == "Unchecked" || downIconChecked == "") {
                checkDownvote();
            } else {
                uncheckDownvote();
            }
        } else {
            // uncheck up and then check down
            uncheckUpvote()
            checkDownvote();
        }
    };

    handleUpIconPress = () => {
        if (downIconChecked == "Unchecked" || downIconChecked == "") {
            if (upIconChecked == "Unchecked" || upIconChecked == "") {
                checkUpvote();
            } else {
                uncheckUpvote()
            }
        } else {
            // uncheck down then check up
            uncheckDownvote();
            checkUpvote();
        }
    };

    handleFavouriteIconPress = () => {
        if (favouriteIconChecked == "Unchecked" || favouriteIconChecked == "") {
            checkFavourite();
        } else {
            uncheckFavourite();
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