import React from 'react';
import { View,Text ,SafeAreaView,Image} from 'react-native';
import styles from './styles'

const ViewIndividualItems =(props)=>{
    return(
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={styles.container,{flex:0,paddingTop:20}}> 
            <Text style={styles.TextLarge }>View Individual Pairing</Text>
            </SafeAreaView>
            <View style={styles.container,{justifyContent:"center",flexDirection:"row",marginTop:25}}>
                <View>
                    <Image source={require("./assets/waffles.jpg")} style={styles.regularImage}/>
                    <Text style={styles.TextMedium}> Waffles </Text>
                </View>
                <View style={{justifyContent:"center"}}>
                    <Image source={require("./assets/plus.png")} style={styles.smallImage}/>
                </View>
                <View>
            <Image source={require("./assets/milkshake.jpg")} style={styles.regularImage}/>
            <Text style={styles.TextSmall}> A Milkshake </Text>
                </View>
            </View>
        </SafeAreaView>
    )
};

export default ViewIndividualItems;