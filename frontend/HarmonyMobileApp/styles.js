import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  standardContainer:{
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },

  LoginContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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

  backgroundBarShowLatest: {
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width:"95%",
    height:"auto",
    marginTop: 40,
    backgroundColor: "#fff",
    padding: "5%",
   
  },
  shadowBox:{
    shadowColor: '#000000',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 25,
    width:"95%",
    height:"auto",
    marginTop: 40,
    backgroundColor: "#fff",
    padding: "5%",
  },
  Text: {
    fontFamily: "sans-serif-light",
  },

  TextLarge: {
    fontFamily: "sans-serif-light",
    fontSize: 30,
    textAlignVertical: "center",
  },
  TextMedium: {
    fontFamily: "sans-serif-light",
    fontSize: 23,
  },
  TextSmall: {
    fontFamily: "sans-serif-light",
    fontSize: 14,
  },
  regularImage: {
    width: 150,
    height: 100,
    resizeMode: "contain",
  },
  smallImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  standardImage:{
    width: "45%", 
    height: 80,
    resizeMode: "contain",
    borderWidth:2, 
    borderColor:"#d3d3d3",
    borderRadius:5,
  },
  imageContainer:{
    flexDirection:"row",
    borderWidth:2,
    borderColor:"#d3d3d3",
    borderRadius:5
  },
  reviewContainer:{
    width:"85%"
  }
});

export default styles;
