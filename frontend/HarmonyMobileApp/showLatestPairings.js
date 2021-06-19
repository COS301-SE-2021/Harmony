import React from 'react';
import { View,Text ,SafeAreaView,Image} from 'react-native';
import styles from './styles'

const ShowLatestPairings =(props)=>{
    return(
        <SafeAreaView>
        <SafeAreaView style={styles.container,{flex:0,paddingTop:20}}> 
        <Text style={styles.TextMedium }>Here are your 5 most recent pairings</Text>
        </SafeAreaView>
        <View style={styles.rowContainer}>
        <Text style={styles.TextMedium}> Waffles </Text>
        <Text style={styles.TextSmall}> A Milkshake </Text>

        </View>
        <View style={styles.rowContainer}>
        <Text style={styles.TextMedium}> Waffles stacks onto each other idk why </Text>
        <Text style={styles.TextSmall}> A Milkshake </Text>

        </View>
        </SafeAreaView>
    )
};

export default ShowLatestPairings;