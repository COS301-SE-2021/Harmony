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
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)"

  },
  addButton: {
    backgroundColor: "#3f51b5", color: "white", marginLeft: 45, height: 35, borderRadius: 10, paddingLeft: 12, paddingRight: 12, width: "30%",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)"

  },
  requestedItemBox: {
    textAlign: "left",
    width: 200
  },
  requestedItemName: {
    fontSize: 15, float: "left", textAlign: "left", width: 170, height: 30, overflow: "hidden"
  },
  ImageContainer: {
    height: 165,
    width: "60%",
    borderRadius: 5
  },
  PreviewContainer: {
    display: "block",
    marginTop: -30,
    width: "40%"
  },
  PreviewPiece: {
    marginBottom: 10
  },
  FileInput: {
  },
  FoodLabelButton: {
    backgroundColor: "#FF6347",
    marginTop: 15,
    padding: 5,
    borderRadius: 5,
    color: "white",
    width: 200,
    margin: "auto"
    // marginLeft: 30,
  },
  DrinkLabelButton: {
    backgroundColor: "#1FBFBA",
    marginTop: 15,
    padding: 5,
    borderRadius: 5,
    color: "white",
    width: 200,
    margin: "auto"

  },
  MealLabelButton: {
    backgroundColor: "#C41ED4",
    marginTop: 15,
    padding: 5,
    borderRadius: 5,
    color: "white",
    width: 200,

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
    marginRight: 10
  },
  errorStar: {
    color: "red", fontSize: 25, marginLeft: 5, marginTop: -15
  }
}));
