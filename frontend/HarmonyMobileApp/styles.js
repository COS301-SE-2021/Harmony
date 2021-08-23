
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    //application provider container on home screen
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  cardContainer: {
    //the cards container from home screen
    height: "auto",
    flex: 1,
    borderRadius: 15,
    shadowColor: "#000",
    backgroundColor: "white",
    marginHorizontal: 20,
    /* padding: 15,
     shadowOffset: {
       width: 0,
       height: 2
     },
     shadowOpacity: 0.25,
     shadowRadius: 4,
     elevation: 5*/
  },

  scrollView: {
    //Styling for the scroll view, removed so the scroll bar can be all the way to the end
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

  modalView: {
    //styling for the filter pop up
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    width: "95%",
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
    //styling for modal buttons
    borderRadius: 15,
    padding: 10,
    elevation: 2
  },
  applyButton: {
    //styling for modal buttons
    borderRadius: 15,
    width: "35%",
    padding: 5,
    elevation: 2,
    backgroundColor: "#4F6D7A",
    marginHorizontal: 20
  },
  filterText: {
    fontFamily: "sans-serif-light",
    fontSize: 18,
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "white",
    textAlign: "center"
  },
  buttonOpen: {
    //not active modal button
    backgroundColor: "#C5C3C6",
  },
  buttonClose: {
    //active modal button
    backgroundColor: "#4F6D7A",
  },
  closeButtonOnFilter: {
    //button for x
    flex: 1,
    justifyContent: "flex-end"
  },
  textStyle: {
    //close button on modal
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  centeredView: {
    //centering the modal
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  cardText: {
    //text for the food and drink name
    flexDirection: "row",
    justifyContent: "space-around",
    textAlign: "center",
    alignContent: "center",
    fontWeight: "bold",
    fontFamily: "sans-serif-light",
    paddingVertical: "5%",
    fontSize: 18,
  },

  iconsBar: {
    //card icons bar
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
    flex: 1,
    paddingBottom: "2%"
  },

  locationBar: {
    //card location bar
    flexDirection: "row",
    flex: 1,
    padding: 5,
    backgroundColor: "white",//"#6A92A4",
    color: "black"
  },

  tagBar: {
    //card tag bar
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
  filterTag: {
    borderRadius: 10,
    padding: 4,
    height: 30,
    margin: 2,
    paddingHorizontal: 20
  },
  filterTagsContainer: {
    height: "auto",
  },
  filterLabel: {
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "column",
  },
  filterLabelRow: {
    height: 50,
    justifyContent: "space-between",
    paddingVertical: 5,
    width: "100%",
    flexDirection: "row"
  },
  TextInputStyling: {
    borderRadius: 10,
    padding: 2,
    backgroundColor: "#F3F2F2",
    height: 30,
    width: 100,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  pickerView: {
    opacity: 0,
    zIndex: 100,
    marginTop: "-20%",
    marginRight: "-55%",
  },
  spaceLeft: {
    textAlign: "left",
    fontWeight: "bold",
  },

  spaceRight: {
    textAlign: "right",
    flex: 1,
    borderRadius: 10,
    padding: 2,
    backgroundColor: "#F3F2F2",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    width: 120

  },
  filterView: {
    borderWidth: 2,
    paddingBottom: "4%",
    paddingHorizontal: 5,
    borderRadius: 10,
    borderColor: "#F7F7F7",
    width: "100%"
  },
  Text: {
    //To my knowledge (Tia) not used
    fontFamily: "sans-serif-light",
  },

  TextLarge: {
    //used for the title
    fontFamily: "sans-serif-light",
    fontSize: 40,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  TextMedium: {
    // used as filter pairings title
    fontFamily: "sans-serif-light",
    fontSize: 25,
  },
  TextSmall: {
    //used for text in location bar + filter labels
    fontFamily: "sans-serif-light",
    fontSize: 18,
    textAlignVertical: "center"
  },
  TextSmaller: {
    //used for text in filter
    fontFamily: "sans-serif-light",
    fontSize: 14,
    textAlignVertical: "center"
  },

  regularImage: {
    //To my knowledge (Tia) not used
    width: 150,
    height: 100,
    resizeMode: "contain",
  },
  smallImage: {
    //To my knowledge (Tia) not used
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  standardImage: {
    // For the food+drink images on the cards
    height: 160,
    width: "100%",
    resizeMode: "contain",
    borderWidth: 2,
    flex: 1,

  },
  imageContainer: {
    // hold the food+drink images+text
    flexDirection: "row",
    width: "100%",
    height: 180,
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden"
  },

  tagsSection: {
    //Different from section because theres no padding on the right or left
    //We do this so theres no visible cutoff as you scroll left or right
    paddingVertical: 10,
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
    fontWeight: "bold",
    marginLeft: 10, //Space between tag icon and text
  },

  flexRow: {
    flexDirection: "row"
  },
  flexRowJustCenter: {
    flexDirection: "row",
    justifyContent: "center"
  }


});

export default styles;
