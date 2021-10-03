import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  dashedBorder: {
    border: "1px dashed",
    borderColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(1),
  },
  text: {
    marginBottom: theme.spacing(2),
  },
  textAreaField: {
    width: "85%",
    height: 100,
    padding: 15,
    fontFamily: "sans-serif-light",
    color: "#717171",
  },
  individualTextField: {
    width: "75%",
    height: 10,
  },
  multiselector: {
    width: "75%",
    height: 35,
    marginLeft: 8
  },
  multiselectorTag: {
    width: "95%",
    height: 15,
    marginLeft: 100
  },
  formLabel: {
    marginTop: 10,
    fontSize: 20,
    width: 110
  },
  formElements: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 15,
    display: "flex"
  },
  formElementsPairingTag: {
    marginTop: 80,
    marginBottom: 10,
    display: "flex",
    width: '60%',
  },
  tagName: {
    fontSize: 20,
    width: 65
  },
  MealContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: "85%",
    margin: "auto",
    display: "table"
  },
  formElementsImageContainer: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 15,
    justifyContent: "space-around",
    display: "flex",
    padding: 10
  },
  addItemContainer: {
    width: "95%",
    marginLeft: 40,
    padding: 15,
    borderRadius: 5,
    float: "left",
    backgroundColor: "white",
    textAlign: "center",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)"
  },
  requestContainer: {
    width: "25%",
    height: 620,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "white",
    float: "left",
    textAlign: "center",
    // margin: "auto",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)"
  },
  button: {
    backgroundColor: "#CECECE", height: 35, borderRadius: 10, paddingLeft: 12, paddingRight: 12
  },
  toggleButton: {
    borderRadius: 10, height: 70
  },
  clearButton: {
    backgroundColor: "#CECECE", margin: 10, height: 35, borderRadius: 10, paddingLeft: 12, paddingRight: 12, width: "20%",
    float: "none",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)"
  },
  uploadFoodButton: {
    backgroundColor: "#FF6347",
    height: 35, borderRadius: 5, paddingLeft: 12, paddingRight: 12, width: "40%",
    float: "none", color: 'white', fontWeight: "bold",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)"
  },
  uploadDrinkButton: {
    backgroundColor: "#1FBFBA",
    height: 35, borderRadius: 5, paddingLeft: 12, paddingRight: 12, width: "40%",
    float: "none", color: 'white', fontWeight: "bold",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)"
  },
  buttonContainer: {
    float: "auto",
  },
  addButton: {
    backgroundColor: "#81b5c2", color: "white", marginLeft: 45, height: 35, borderRadius: 10, paddingLeft: 12, paddingRight: 12, width: "30%",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)"

  },
  ButtonContainer: {
    float: 'left',
    margin: 'auto',
    width: '100%'
  },
  ImageContainer: {
    height: 165,
    width: "100%",
    borderRadius: 5
  },

  PreviewContainer: {
    display: "block",
    width: "45%",
    border: "1px solid #EDEDED",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.02)",
    borderRadius: 5,
  },
  PreviewContainerPairing: {
    display: "block",
    border: "1px solid #EDEDED",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.02)",
    height: "auto",
    width: "90%",
    margin: "auto",
    borderRadius: 5,
  },
  clear: {
    clear: "both"
  },
  PreviewPiece: {
    marginBottom: 10,
    float: "left",
  },
  FileInput: {
  },
  FoodLabelButton: {
    backgroundColor: "#FF6347",
    padding: 8,
    color: "white",
    width: "100%",
    margin: "auto",
    height: 40,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    fontWeight: 'bold',
    fontSize: 18
    // marginLeft: 30,
  },
  DrinkLabelButton: {
    backgroundColor: "#1FBFBA",
    padding: 10,
    color: "white",
    width: "100%",
    margin: "auto",
    height: 40,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    fontWeight: 'bold',
    fontSize: 18

  },
  MealLabelButton: {
    backgroundColor: "#C41ED4",
    padding: 10,
    color: "white",
    width: "100%",
    margin: "auto",
    height: 40,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    fontWeight: 'bold',
    fontSize: 18

  },
  configLabel: {
    width: 150
  },
  configurationLabel: {
    backgroundColor: "#4CD41E",
    padding: 10,
    color: "white",
    width: "100%",
    margin: "auto",
    height: 40,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    fontWeight: 'bold',
    fontSize: 18

  },
  displayFlexJustifyCenter: {
    display: "flex", justifyContent: "center"
  },
  displayFlexJustifyAround: {
    display: "flex", justifyContent: "space-around"
  },
  background: {
    flexDirection: "row", justifyContent: "space-around", paddingTop: 15, backgroundColor: "#F3F3F3",
  },
  greyContainer: {
    justifyContent: "center", display: "flex", flexDirection: "row", paddingTop: 25, backgroundColor: "#F3F3F3"
  },
  displayFlexOnly: {
    display: "flex"
  },
  icon: { float: "right", height: 20, width: 20, marginTop: 15, marginBottom: 0 },
  fontSizeMedium: {
    fontSize: 20,
    fontFamily: "sans-serif-light",
    marginTop: 0
  },
  pageContainer: {
    float: "right",
    width: "95%"
  },
  floatLeft: {
    float: "left"
  },
  clearBoth: {
    clear: "both"
  },
  errorDiv: {
    fontSize: 15,
    marginTop: 0,
    color: "#717171",
  },
  errorStar: {
    color: "red", fontSize: 25, marginRight: 5, marginTop: -10
  },
  justifySpaceBet: {
    justifyContent: "space-around",
    width: "100%",
    display: "flex"
  }
}));
