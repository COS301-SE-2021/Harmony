import React from 'react';
import { View,Text ,SafeAreaView,Image,ScrollView,StyleSheet,StatusBar} from 'react-native';
import styles from './styles'

const ShowLatestPairings =(props)=>{
    return(
        <SafeAreaView style={personalStyles.container}>
            
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