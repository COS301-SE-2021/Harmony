import React from 'react';
import { View,Text ,SafeAreaView,Image} from 'react-native';
import styles from './styles'

const ViewIndividualItems =(props)=>{
    return(
        <SafeAreaView style={styles.container}> 
        <Text style={styles.Text}>View Individual Pairing</Text>
        <Image source={require("./assets/waffles.jpg")} style={styles.regularImage}/>
        <Text style={styles.Text}> Waffles </Text>
        <Image source={require("./assets/milkshake.jpg")} style={styles.regularImage}/>
        <Text style={styles.Text}> A Milkshake </Text>

        </SafeAreaView>
    )
};

export default ViewIndividualItems;