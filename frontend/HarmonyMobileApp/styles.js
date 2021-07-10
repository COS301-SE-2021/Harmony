
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  cardContainer: {
    height: "100%",
    flex: 1,
    borderColor: "grey",
    borderWidth: 1,
  },
  standardContainer: {
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
    width: "95%",
    height: "auto",
    marginTop: 40,
    backgroundColor: "#fff",
    padding: "5%",

  },

  Header: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "auto",
    marginTop: 40,
    backgroundColor: "#fff",
    padding: "5%",
    paddingBottom: "10%",
    flex: 1,
    flexDirection: "row",

  },
  shadowCard: {
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
    width: "95%",
    height: "auto",
    marginTop: 40,
    backgroundColor: "#fff",
    padding: "5%",
  },


  Card: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    backgroundColor: "#fff",
    shadowRadius: 8,
    shadowOpacity: 80.0,
    alignItems: "center",
    width: "100%",
    paddingTop: "5%",
    flex: 1

  },

  cardText: { alignItems: "center" },

  iconsBar: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 80.0,
    flexDirection: "row",
    borderWidth: 2,
    borderTopColor: "grey",
    borderColor: "white",
    paddingLeft: "4%",
    paddingRight: "4%",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: "5%",
    flex: 1

  },
  locationBar: {
    flexDirection: "row",
    paddingBottom: "5%",
    justifyContent: "space-between",
    flex: 1

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
  standardImage: {
    width: "50%",
    height: "100%",
    resizeMode: "contain",
    borderColor: "white",
    borderWidth: 2,
    flex: 1

  },
  imageContainer: {
    flexDirection: "row",
    width: "100%",
    height: 120,
    flex: 1

  },
});

export default styles;
