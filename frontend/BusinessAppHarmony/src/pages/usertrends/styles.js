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

  errorDiv: {
    fontSize: 15,
    marginTop: 0,
    color: "#717171",
  },
  individualTextField: {
    width: "100%",
    height: 70,
    float: "left"
  },
  multiselector: {
    width: "75%",
    height: 35,
    marginLeft: 8
  },
  multiselectorTag: {
    width: "75%",
    height: 15,
    marginLeft: 100
  },
  formLabel: {
    fontSize: 20,
    width: 150,
    justifyContent: "space-between",
    display: "flex",
    marginTop: 15
  },
  formElements: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 15,
    display: "flex"
  },
  formElementsPairingTag: {
    marginTop: 20,
    marginBottom: 30,
    display: "flex",
    width: '40%',
  },
  tagName: {
    float: 'left',
    marginRight: 15,
    marginTop: 8,
    fontSize: 20
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
    display: "flex"
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

  uploadLogoButton: {
    backgroundColor: theme.palette.primary.main,
    height: 25, borderRadius: 50, paddingLeft: 10, paddingRight: 10, fontSize: 10, marginLeft: 10, marginTop: -5,
    float: "none", color: 'white',
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)"
  },

  buttonContainer: {
    float: "auto",
  },
  marginAuto: {
    margin: "auto",
  },
  addButton: {
    backgroundColor: "#81b5c2", color: "white", marginLeft: 45, height: 35, borderRadius: 10, paddingLeft: 12, paddingRight: 12, width: "30%",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)"

  },
  addLocationButton: {
    backgroundColor: "#81b5c2", color: "white", marginLeft: 25, height: 35, borderRadius: 10, width: "60%",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)",
    float: "left"
  },
  ClearButton: {
    backgroundColor: "#CECECE", marginLeft: 15, height: 35, borderRadius: 10, width: "20%",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)",
    float: "left"
  },

  ButtonContainer: {
    float: 'left',
    margin: 'auto',
    width: '100%'
  },

  clear: {
    clear: "both"
  },
  foodChip: {
    backgroundColor: "#FF6347",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    padding: 5,
    textAlign: "center",
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15
  },
  drinkChip: {
    backgroundColor: "#1FBFBA",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    padding: 5,
    textAlign: "center",
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15


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
  CoordinatesContainer: {
    float: "left",
    width: "100%",
    paddingRight: 10,
    paddingLeft: 10,
  },
  formContainer: {
    display: "flex",
  },
  errorStar: {
    color: "red", fontSize: 25, marginRight: 5, marginTop: -10
  },
  outstandingBalance: {
    color: theme.palette.primary.main,
    textAlign: "center"
  },
  outstandingBalanceWord: {
    fontSize: 15,
    marginTop: 20,
    color: "#717171",
    float: "left"
  },
  payNowButton: {
    width: "100%",
    margin: "auto",
    backgroundColor: theme.palette.primary.main,
    fontSize: 17,
    color: "white",
    height: 50
  },
  tableRowHeader: {
    backgroundColor: theme.palette.primary.main,
    color: "white"
    // height: 60,
    // overflow: "hidden"
  },

  tableCell: {
    color: "white"

  },
  center: {
    padding: 15,
    marginLeft: 60,
  },
  ImageContainer: {
    height: 165,
    width: "100%",
    borderRadius: 5,
  },

  PreviewContainer: {
    display: "block",
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
  PreviewPiece: {
    marginBottom: 10,
    height: 165
  },
  floatLeft: {
    float: "left"
  },
  clearBoth: {
    clear: "both"
  },
  justifySpaceBet: {
    justifyContent: "space-around",
    width: "100%",
    display: "flex"
  },
  justifySpaceBetText: {
    justifyContent: "space-around",
    width: "100%",
    display: "flex",
    marginTop: 15,
    marginBottom: 10
  },
}));
