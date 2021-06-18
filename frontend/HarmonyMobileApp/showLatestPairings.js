import React from 'react';
import { View,Text ,SafeAreaView,Image} from 'react-native';
import styles from './styles'

const showLatestPairings =(props)=>{
    return(
        <SafeAreaView>
        <SafeAreaView style={styles.container,{flex:0,paddingTop:20}}> 
        <Text style={styles.TextLarge }>View Individual Pairing</Text>
        </SafeAreaView>
        <View style={styles.container,{position:"relative",alignSelf:"center",}}>
        <Text style={styles.TextMedium}> Waffles </Text>
        <Text style={styles.TextSmall}> A Milkshake </Text>

        </View>
        </SafeAreaView>
    )
};

export default showLatestPairings;