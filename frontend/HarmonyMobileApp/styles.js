
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
    borderRadius: 15,
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
    backgroundColor: "#FF6347",
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
    flex: 1,
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    backgroundColor: "#4F6D7A",
    color: "white"
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
    color: "white"

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
  tagsSection: {
    //Different from section because theres no padding on the right or left
    //We do this so theres no visible cutoff as you scroll left or right
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    backgroundColor: "white",
  },
  rowContainer: {
    //Container to hold all tags
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    flexWrap: "wrap",
  },
  tagContainer: {
    //Container of individual tag
    flexDirection: "row", //Needed to keep the tag icon and text in one line
    backgroundColor: "#FF6347",
    borderRadius: 20,
    margin: 5, //Space between tags
    padding: 10, //Space around innner tag
    elevation: 2, //gives shadow/3D effect
  },
  tagText: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 10, //Space between tag icon and text
  },
});

export default styles;
