
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
    borderRadius: 15,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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
  modalContainer: {
    flex: 1,
    backgroundColor: "pink",
    marginTop: 'auto',
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#DD6E42",
  },
  buttonClose: {
    backgroundColor: "#4F6D7A",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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

  cardText: { flexDirection: "row", justifyContent: "space-between" },

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
    flex: 1,
  },
  tagBar: {
    flexDirection: "row",
    paddingBottom: "5%",
    flex: 1,
    justifyContent: "space-around"
  },
  tag: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    backgroundColor: "#DD6E42",
    color: "white"
  },
  Text: {
    fontFamily: "sans-serif-light",
  },

  TextLarge: {
    fontFamily: "sans-serif-light",
    fontSize: 40,
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
  TextSmallWhite: {
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
