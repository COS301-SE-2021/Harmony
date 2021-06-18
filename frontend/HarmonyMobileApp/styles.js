import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    inputView: {
      backgroundColor: "#e0ffff",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
   
      alignItems: "center",
    },
   
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
    },
   
    forgot_button: {
      height: 30,
      marginBottom: 30,
    },
   
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#20b2aa",
    },

    Text:{
      fontFamily:"sans-serif-light"
    },

    TextLarge:{
      fontFamily:"sans-serif-light",
      fontSize: 30, 
    },
    TextMedium:{
      fontFamily:"sans-serif-light",
      fontSize: 23, 
    },
    TextSmall:{
      fontFamily:"sans-serif-light",
      fontSize:14
    },
    regularImage:{
      width:150,
      height:100
    }
});
  
export default styles;