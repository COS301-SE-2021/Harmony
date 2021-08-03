import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    ScrollView,
    StyleSheet,
} from "react-native";
import styles from "../styles";
import {
    SimpleLineIcons,
    FontAwesome5,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import {
    Divider,
    Text,
} from "@ui-kitten/components";
import IconsBar from "../Components/IconsBar";

// make api call with dataSet.PID
export default function Card({ dataSet, ...otherProps }) {

    return (
        <View style={{ paddingBottom: 15 }}>
            <View style={styles.cardContainer}>
                <View style={styles.imageContainer}>
                    <View
                        style={{
                            flexDirection: "column",
                            textAlign: "center",
                            width: "50%",
                            height: 180,
                        }}
                    >
                        <Image
                            source={{ uri: dataSet.FoodImage }}
                            style={styles.standardImage}
                        />
                        <Text style={styles.cardText}>{dataSet.FooddataSet}</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            textAlign: "center",
                            width: "50%",
                            height: 180,
                        }}
                    >
                        <Image
                            source={{ uri: dataSet.DrinkImage }}
                            style={styles.standardImage}
                        />

                        <Text style={styles.cardText}>{dataSet.DrinkdataSet}</Text>
                    </View>
                </View>

                <Divider />
                <View style={styles.tagsSection}>
                    <ScrollView
                        contentContainerStyle={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                        }}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                    >
                        <View style={styles.rowContainer}>
                            {dataSet.FoodTags.map((tag, index) => (
                                <View style={styles.tagContainer} key={index}>
                                    {/*<FontAwesome name="tag" size={14} color="#fff" />*/}
                                    <MaterialIcons
                                        name="fastfood"
                                        size={14}
                                        color="#fff"
                                    />
                                    {/* Keeping outlined icons just incase we want to change to them for consistency overall */}
                                    {/* The filled icons look better in this case though */}
                                    {/* <Feather name="tag" size={16} color="#fff" /> */}
                                    <Text style={styles.tagText}>{tag}</Text>
                                </View>
                            ))}

                            {dataSet.FoodTags.map((tag, index) => (
                                <View
                                    style={[
                                        styles.tagContainer,
                                        { backgroundColor: "#C41ED4" },
                                    ]}
                                    key={index}
                                >
                                    {/*<FontAwesome name="tag" size={14} color="#fff" />*/}
                                    <FontAwesome5
                                        name="hamburger"
                                        size={14}
                                        color="#fff"
                                    />
                                    {/* Keeping outlined icons just incase we want to change to them for consistency overall */}
                                    {/* The filled icons look better in this case though */}
                                    {/* <Feather name="tag" size={16} color="#fff" /> */}
                                    <Text style={styles.tagText}>{tag}</Text>
                                </View>
                            ))}
                            {dataSet.DrinkTags.map((tag, index) => (
                                <View
                                    style={[
                                        styles.tagContainer,
                                        { backgroundColor: "#1FBFBA" },
                                    ]}
                                    key={index}
                                >
                                    {/*<FontAwesome name="tag" size={14} color="#fff" />*/}
                                    <MaterialCommunityIcons
                                        name="cup"
                                        size={14}
                                        color="#fff"
                                    />
                                    {/* Keeping outlined icons just incase we want to change to them for consistency overall */}
                                    {/* The filled icons look better in this case though */}
                                    {/* <Feather name="tag" size={16} color="#fff" /> */}
                                    <Text style={styles.tagText}>{tag}</Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
                <Divider />
                <View style={styles.locationBar}>
                    <SimpleLineIcons
                        name="location-pin"
                        style={{ paddingVertical: "3%", paddingRight: "2%" }}
                        size={26}
                        color="black"
                    />
                    <View
                        style={{
                            alignContent: "flex-end",
                            alignSelf: "flex-end",
                            flex: 1,
                            paddingRight: "1%",
                        }}
                    >
                        <Text style={styles.TextSmall}>{dataSet.Location} </Text>
                        <Text style={styles.TextSmall}>35 KM</Text>
                    </View>
                </View>
                <Divider />

                <IconsBar
                    dataSet={dataSet}
                />

            </View>
        </View>
    );
};

const personalStyles = StyleSheet.create({



});
