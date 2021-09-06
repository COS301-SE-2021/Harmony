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
  textField: {
    width: "65%",
    height: 15,
    padding: 15,
  },
  individualTextField: {
    width: "75%",
    height: 15,
    padding: 15,
    // borderColor: 'grey'
  },
  multiselector: {
    width: "75%",
    height: 15,
  },
  formLabel: {
    marginTop: 10,
    fontSize: 20
  },
  formElements: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 15,
    display: "flex"
  },
  formElementsAudience: {
    marginTop: 20,
    marginBottom: 30,
    display: "flex",
    float: "left",
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
  clearButton: {
    backgroundColor: "#CECECE", margin: 10, height: 35, borderRadius: 10, paddingLeft: 12, paddingRight: 12, width: "20%",
    float: "none",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)"
  },
  buttonContainer: {
    float: "auto",
  },
  addButton: {
    backgroundColor: "#3f51b5", color: "white", marginLeft: 45, height: 35, borderRadius: 10, paddingLeft: 12, paddingRight: 12, width: "30%",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)"

  },
  ButtonContainer: {
    float: 'left',
    margin: 'auto',
    width: '100%'
  },
  ImageContainer: {
    height: 165,
    width: "60%",
    borderRadius: 5
  },
  PreviewContainer: {
    display: "block",
    width: "40%",
    border: "1px solid #EDEDED",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)",
    borderRadius: 5,
  },
  PreviewContainerPairing: {
    display: "block",
    border: "1px solid #EDEDED",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)",
    borderRadius: 5,

    marginBottom: 20,
    width: "85%",
    margin: "auto"
  },
  PreviewPiece: {
    marginBottom: 10
  },
  FileInput: {
  },
  FoodLabelButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    color: "white",
    width: "100%",
    margin: "auto",
    height: 40,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
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
    borderTopLeftRadius: 5

  },
  MealLabelButton: {
    backgroundColor: "#C41ED4",
    padding: 10,
    color: "white",
    width: "100%",
    margin: "auto",
    height: 40,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5

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
  errorDiv: {
    fontSize: 15,
    marginTop: 0,
    color: "#717171",
  },
  errorStar: {
    color: "red", fontSize: 25, marginRight: 5, marginTop: -10
  },
  justifySpaceBet: {
    justifyContent: "space-between",
    width: "100%"
  }
}));
