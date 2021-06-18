import React from 'react';
import { View,Text ,SafeAreaView} from 'react-native';
import styles from './styles'

const ViewIndividualItems =(props)=>{
    return(
        <SafeAreaView style={styles.container}> 
        <Text> Component - viewIndividualItems </Text>
        </SafeAreaView>
    )
};

export default ViewIndividualItems;