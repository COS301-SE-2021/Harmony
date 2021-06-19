import React from 'react';
import { View,Text ,SafeAreaView,Image} from 'react-native';
import styles from './styles'

const ShowLatestPairings =(props)=>{
    return(
        <SafeAreaView style={styles.container}>
            <View style={{paddingTop:"20%"}}> 
                <Text style={styles.TextLarge }>Here are your 5 most recent pairings</Text>
            </View>
            <View style={styles.rowContainer}>
                <View style={styles.backgroundBarShowLatest}>
                    <Text style={styles.TextMedium}> Waffles </Text>
                    <Text style={styles.TextMedium}> A Milkshake </Text>

                </View>
                <View style={styles.backgroundBarShowLatest}>
                    <Text style={styles.TextMedium}> Waffles </Text>
                    <Text style={styles.TextMedium}> A Milkshake </Text>

                </View>
                <View style={styles.backgroundBarShowLatest}>
                    <Text style={styles.TextMedium}> Waffles </Text>
                    <Text style={styles.TextMedium}> A Milkshake </Text>

                </View>
                <View style={styles.backgroundBarShowLatest}>
                    <Text style={styles.TextMedium}> Waffles </Text>
                    <Text style={styles.TextMedium}> A Milkshake </Text>

                </View>
                <View style={styles.backgroundBarShowLatest}>
                    <Text style={styles.TextMedium}> Waffles </Text>
                    <Text style={styles.TextMedium}> A Milkshake </Text>

                </View>
            </View>
        </SafeAreaView>
    )
};

export default ShowLatestPairings;