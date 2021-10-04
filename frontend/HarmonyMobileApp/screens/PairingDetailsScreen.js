import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    StatusBar,
    Image,
    Dimensions,
    Platform,
    ScrollView,
    Text
} from "react-native";
import { useIsFocused } from '@react-navigation/native';

import { ImageHeaderScrollView } from "react-native-image-header-scroll-view";
import {
    FontAwesome5,
    MaterialCommunityIcons
} from "@expo/vector-icons";
import AppLoadingIcon from "../Components/AppLoadingIcon";

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 300;
var startTime;
var endTime;
var differenceInTime
export default function PairingDetailsScreen({ route }) {
    const [isLoading, setLoading] = useState(false);

    const [isErrorAlertVisible, setErrorAlertVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const { data } = route.params;
    console.log(data);
    const isFocused = useIsFocused();



    useEffect(() => {
        if (isFocused) {
            startTime = new Date();
        }
        else if (!isFocused) {
            endTime = new Date();
            differenceInTime = Math.abs(startTime - endTime)//Time in milliseconds
            console.log("Difference in time (ms): " + differenceInTime)
        }
    }, [isFocused]);

    const TitleBar = ({ title }) => (
        <View
            style={[
                styles.section,
                {
                    flexDirection: "row",
                    justifyContent: "center",
                },
            ]}
        >
            <Text style={styles.title}>
                {title}
            </Text>
        </View>
    );

    const ItemDescription = ({ description }) => (
        <View style={[styles.section]}>
            <Text style={styles.sectionText}>
                {description}
            </Text>
        </View>
    );

    const TagBar = ({ itemTags, foodItem }) => (
        <View style={styles.tagsSection}>
            <ScrollView
                contentContainerStyle={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginLeft: "10%",

                }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            >
                <View style={styles.rowContainer}>


                    {itemTags.map((tag, index) => (
                        <View style={[styles.tagContainer, TagColour(foodItem)]} key={index}>
                            {foodItem ?
                                <FontAwesome5
                                    name="hamburger"
                                    size={16}
                                    color="#fff"
                                />
                                : <MaterialCommunityIcons
                                    name="cup"
                                    size={16}
                                    color="#fff"
                                />
                            }

                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView >
        </View >
    );

    const TagColour = (foodItem) => {
        if (foodItem)
            return {
                backgroundColor: "#C41ED4",
            };
        else
            return {
                backgroundColor: "#1FBFBA",
            };

    }

    const Drink = () => (
        <View style={[styles.centeredView]}>
            <View id={data.DrinkID}>
                <Image
                    source={{ uri: data.DrinkImage }}
                    style={[styles.drinkCard, styles.bigDrinkCard]}
                />
            </View>
        </View >
    );
    const Food = () => (
        <View style={[styles.centeredView]}>
            <View id={data.DrinkID}>
                <Image
                    source={{ uri: data.FoodImage }}
                    style={[styles.drinkCard, styles.bigDrinkCard]}
                />
            </View>
        </View >
    );

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            {data.IsSponsor ?
                (
                    <ImageHeaderScrollView
                        maxHeight={MAX_HEIGHT}
                        minHeight={MIN_HEIGHT}
                        renderHeader={() => (
                            <Image
                                style={styles.foodCard}
                                source={{ uri: data.Logo }}
                            />
                        )}
                    >
                        <TitleBar title={data.BusinessName} />
                        <ItemDescription description={data.SponsoredDescription} />

                        <Food />
                        <TitleBar title={data.FoodItem} />
                        <TagBar itemTags={data.FoodTags} foodItem={true} />

                        <Drink />
                        <TitleBar title={data.DrinkItem} />
                        <TagBar itemTags={data.DrinkTags} foodItem={false} />

                        {isLoading === true && <AppLoadingIcon />}

                    </ImageHeaderScrollView>
                )
                :
                (
                    <ImageHeaderScrollView
                        maxHeight={MAX_HEIGHT}
                        minHeight={MIN_HEIGHT}
                        renderHeader={() => (
                            <Image
                                style={styles.foodCard}
                                source={{ uri: data.FoodImage }}
                            />
                        )}
                    >
                        <TitleBar title={data.FoodItem} />
                        <ItemDescription description={data.FoodDesc} />
                        <TagBar itemTags={data.FoodTags} foodItem={true} />

                        <Drink />
                        <TitleBar title={data.DrinkItem} />
                        <ItemDescription description={data.DrinkDesc} />
                        <TagBar itemTags={data.DrinkTags} foodItem={false} />

                        {isLoading === true && <AppLoadingIcon />}

                    </ImageHeaderScrollView>
                )
            }
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    foodCard: {
        height: MAX_HEIGHT,
        width: Dimensions.get("window").width,
        alignSelf: "stretch",
        resizeMode: "cover",
    },
    title: {
        fontSize: 22,
        alignSelf: "center",
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 20,
        textAlign: "center",
        padding: 10,
        // borderWidth: 1,
        borderRadius: 20,
        width: "100%",
        // backgroundColor: "#EAEAEA",
        borderBottomColor: "#cccccc",
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
        backgroundColor: "white",
    },
    sectionText: {
        fontSize: 16,
        textAlign: "center",
    },
    tagsSection: {
        //Different from section because theres no padding on the right or left
        //We do this so theres no visible cutoff as you scroll left or right
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
        backgroundColor: "white",
    },
    rowContainer: {
        //Container to hold all tags
        width: "100%",
        flexDirection: "row",
        alignContent: "center",
        flexWrap: "wrap",
    },
    tagContainer: {
        //Container of individual tag
        flexDirection: "row", //Needed to keep the tag icon and text in one line
        borderRadius: 20,
        margin: 5, //Space between tags
        padding: 10, //Space around innner tag
        elevation: 2, //gives shadow/3D effect
    },
    tagText: {
        fontSize: 14,
        color: "#fff",
        marginLeft: 10, //Space between tag icon and text
    },
    drinkCard: {
        //Card style for drinks
        // borderRadius: 20,
        borderRadius: 20,
        margin: 5,
        padding: 10,
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 3,
        // backgroundColor: "red",
        // flexDirection: "row",
        resizeMode: "cover",

        // resizeMode: "contain",
        // borderWidth: 1,//Contain and border width=1 will give the blured effect
        //But will also create an image flicker after the big to small animation
    },
    smallDrinkCard: {
        width: 150,
        height: 150,
    },
    bigDrinkCard: {
        width: 300,
        height: 300,
    },
    otherDrinkCardsContainer: {
        marginHorizontal: 16,
        marginTop: 10,
        width: "100%",
    },
    cardTextOverlay: {
        fontSize: 20,
        color: "white",
        // color: "black",
        marginHorizontal: 10,
        fontWeight: "600",
        textAlign: "center",
        // backgroundColor: "rgba(0,0,0,0.3)",
    },
    cardBackgroundOverlay: {
        // position: "absolute",
        height: 50,
        left: 5,
        bottom: 5,
        // backgroundColor: "rgba(0,0,0,0.1)",
        // backgroundColor: "#4F6D7A",
        // backgroundColor: "#DD6E42",
        // backgroundColor: "#FF6347",
        backgroundColor: "#1FBFBA",
        // backgroundColor: "#E8DAB2",
        // backgroundColor: "#C0D6DF",
        // backgroundColor: "#EAEAEA",
        // backgroundColor: "#06D6A0",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        // borderWidth: 1,
        elevation: 2,

        justifyContent: "center",
        alignItems: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 4,
        margin: 5,
    },
    buttonCorrect: {
        backgroundColor: "#56a211",
    },
    buttonIncorrect: {
        backgroundColor: "#e9430f",
    },
    closeButton: {
        position: "absolute",
        right: 10,
        top: 5,
    },
    modalHeaderSection: {
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
        backgroundColor: "white",
    },
    modalText: {
        paddingVertical: 10,
        fontSize: 20,
        textAlign: "center",
    },
});
