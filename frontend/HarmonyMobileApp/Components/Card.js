import React, { useState } from "react";
import {
    View,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { useNavigation } from '@react-navigation/native';

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

export default function Card({ dataSet, isDeleteVisible, userFavs, ...otherProps }) {
    const navigation = useNavigation();
    const [hide, setHide] = useState(false);

    return (
        <View>
            {!hide &&
                <View style={{ paddingBottom: 15 }}>
                    <View style={styles.cardContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}

                            onPress={() => {
                                navigation.navigate("PairingDetails", {
                                    data: dataSet,
                                })
                            }}
                        >

                            {dataSet.IsSponsor ?
                                <View>
                                    <View style={styles.adTitleContainer}>
                                        <Image
                                            style={styles.tinyLogo}
                                            source={{
                                                uri: dataSet.Logo,
                                            }}
                                        />
                                        <View style={{
                                            left: "150%",
                                        }}>

                                            <Text style={styles.adTitleText}>
                                                Sponsored
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.adimageContainer}>
                                        <View
                                            style={personalStyles.image}
                                        >
                                            <Image
                                                source={{ uri: dataSet.FoodImage }}
                                                style={styles.standardImage}
                                            />
                                            <Text style={styles.cardText}>{dataSet.FoodItem}</Text>
                                        </View>

                                        <View
                                            style={personalStyles.image}
                                        >
                                            <Image
                                                source={{ uri: dataSet.DrinkImage }}
                                                style={styles.standardImage}
                                            />

                                            <Text style={styles.cardText}>{dataSet.DrinkItem}</Text>
                                        </View>
                                    </View>
                                </View>

                                :
                                <View style={styles.imageContainer}>
                                    <View
                                        style={personalStyles.image}
                                    >
                                        <Image
                                            source={{ uri: dataSet.FoodImage }}
                                            style={styles.standardImage}
                                        />
                                        <Text style={styles.cardText}>{dataSet.FoodItem}</Text>
                                    </View>

                                    <View
                                        style={personalStyles.image}
                                    >
                                        <Image
                                            source={{ uri: dataSet.DrinkImage }}
                                            style={styles.standardImage}
                                        />

                                        <Text style={styles.cardText}>{dataSet.DrinkItem}</Text>
                                    </View>
                                </View>
                            }

                        </TouchableOpacity>


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
                                    <View style={styles.tagContainer} >
                                        <MaterialIcons
                                            name="fastfood"
                                            size={14}
                                            color="#fff"
                                        />
                                        <Text style={styles.tagText}>{dataSet.MealTag}</Text>
                                    </View>
                                    {dataSet.FoodTags.map((tag, index) => (
                                        <View
                                            style={[
                                                styles.tagContainer,
                                                { backgroundColor: "#C41ED4" },
                                            ]}
                                            key={index}
                                        >
                                            <FontAwesome5
                                                name="hamburger"
                                                size={14}
                                                color="#fff"
                                            />
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
                                            <MaterialCommunityIcons
                                                name="cup"
                                                size={14}
                                                color="#fff"
                                            />
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
                                style={personalStyles.locationPinPadding}
                                size={26}
                                color="black"
                            />
                            <View
                                style={personalStyles.locationResultBox}
                            >
                                <Text style={styles.TextSmall}>{dataSet.Location} </Text>
                                <Text style={styles.TextSmall}>{dataSet.Distance} KM</Text>
                            </View>
                        </View>
                        {!dataSet.IsSponsor ?
                            <View>
                                <Divider />

                                <IconsBar
                                    dataSet={dataSet}
                                    upVoteVal={dataSet.Upvotes}
                                    downVoteVal={dataSet.Downvotes}
                                    isDV={dataSet.isDownvoted}
                                    isUV={dataSet.isUpvoted}
                                    isF={dataSet.isFavourited}
                                    isDeleteVisible={isDeleteVisible}
                                    userFavs={userFavs}
                                    deletePairing={() => {
                                        setHide(true);
                                    }}
                                    hide={hide}
                                    unFav={() => {
                                        setHide(true);
                                    }}

                                />
                            </View>
                            :
                            <View style={{
                                //card icons bar
                                padding: "2%",
                            }}>

                            </View>
                        }

                    </View>
                </View>}


        </View>

    );
};

const personalStyles = StyleSheet.create({

    image: {
        flexDirection: "column",
        textAlign: "center",
        width: "50%",
        height: 180,
    },
    locationResultBox: {
        alignContent: "flex-end",
        alignSelf: "flex-end",
        flex: 1,
        paddingRight: "1%",
    },
    locationPinPadding: {
        paddingVertical: "3%",
        paddingRight: "2%"
    }

});
