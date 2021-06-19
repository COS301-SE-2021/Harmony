import React from 'react';
import { View,Text ,SafeAreaView,Image,ScrollView,StyleSheet,StatusBar} from 'react-native';
import styles from './styles'

const ShowLatestPairings =(props)=>{
    return(
        <SafeAreaView style={personalStyles.container}>
            <View style={{paddingTop:"20%"}}> 
                <Text style={styles.TextLarge }>Here are your 5 most recent pairings</Text>
            </View>
            <ScrollView style={personalStyles.scrollView}>
                <View style={styles.backgroundBarShowLatest}>
                    <Text style={styles.TextMedium}> Waffles </Text>
                    <View style={{justifyContent:"center"}}>
                        <Image source={require("./assets/plus.png")} style={styles.smallImage}/>
                    </View>
                     <Text style={styles.TextMedium}> A Milkshake </Text>
                   
                </View>
                <View style={styles.backgroundBarShowLatest}>
                    <Text style={styles.TextMedium}> Waffles </Text>
                    <View style={{justifyContent:"center"}}>
                        <Image source={require("./assets/plus.png")} style={styles.smallImage}/>
                    </View>
                    <Text style={styles.TextMedium}> A Milkshake </Text>

                </View>
                <View style={styles.backgroundBarShowLatest}>
                    <Text style={styles.TextMedium}> Waffles </Text>
                    <View style={{justifyContent:"center"}}>
                        <Image source={require("./assets/plus.png")} style={styles.smallImage}/>
                    </View>
                    <Text style={styles.TextMedium}> A Milkshake </Text>

                </View>
                <View style={styles.backgroundBarShowLatest}>
                    <Text style={styles.TextMedium}> Waffles </Text>
                    <View style={{justifyContent:"center"}}>
                        <Image source={require("./assets/plus.png")} style={styles.smallImage}/>
                    </View>
                    <Text style={styles.TextMedium}> A Milkshake </Text>

                </View>
                <View style={styles.backgroundBarShowLatest}>
                    <Text style={styles.TextMedium}> Waffles </Text>
                    <View style={{justifyContent:"center"}}>
                        <Image source={require("./assets/plus.png")} style={styles.smallImage}/>
                    </View>
                    <Text style={styles.TextMedium}> A Milkshake </Text>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
};
const personalStyles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      
    },
    scrollView: {
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
  });

export default ShowLatestPairings;