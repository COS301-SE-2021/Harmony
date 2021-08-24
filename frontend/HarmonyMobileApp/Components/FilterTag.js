import React, { useState, useEffect, useContext } from "react";
import {
    StyleSheet,
    Pressable,
} from "react-native";
import { Text } from '@ui-kitten/components';
import FilterContext from './FilterContext';
export default function FilterTag({ color, title, filterType }) {
    const [filterColor, setFilterColor] = useState("#F3F2F2");
    const [filterTextColor, setTextColor] = useState("black");
    //variable gets set on load so its used to set the colours on load also

    const myFilterContext = useContext(FilterContext);

    //useEffect only called ONCE onLoad
    useEffect(() => {
        //Checks the state of the tags
        //If a tag has been selected then we will colour it in and set the text to white
        //Else we will leave it as the default colour (grey) and black text
        if ((myFilterContext.mealTagArray.includes(title) && filterType == "mealTypes")
            || (myFilterContext.foodTagArray.includes(title) && filterType == "food")
            || (myFilterContext.drinkTagArray.includes(title) && filterType == "drinks")
        ) {
            setFilterColor(color);
            setTextColor("white");
        }
    }, []);

    //adds the tag to an array
    //There are three arrays: 
    //mealTagArray,foodTagArray,drinkTagArray,
    //the filterType is used to determine into which array the tag goes into
    function checkTag() {
        console.log("checkTag")
        console.log("title: " + title + " filterType: " + filterType)
        myFilterContext.appendTagToArray(title, filterType)
        console.log("My context mealTagArray:" + myFilterContext.mealTagArray);
        console.log("My context foodTagArray:" + myFilterContext.foodTagArray);
        console.log("My context drinkTagArray:" + myFilterContext.drinkTagArray);
    };

    const uncheckTag = () => {
        console.log("uncheckTag")
        console.log("My context mealTagArray:" + myFilterContext.mealTagArray);
        console.log("My context foodTagArray:" + myFilterContext.foodTagArray);
        console.log("My context drinkTagArray:" + myFilterContext.drinkTagArray);
        myFilterContext.removeTagFromArray(title, filterType)

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
            onPress={() => {
                //if i put this in a seperate function it only calls snack instead of the one pressed,
                //console.log("was pressed"),
                //  setClicked(true),
                tagColor();
                textColor();
            }
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
