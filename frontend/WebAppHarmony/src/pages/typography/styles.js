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
    height: 45,
    padding: 15,
  },
  formLabel: {
    marginTop: 10,
    fontSize: 20
  },
  formElements: {
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 15,
    justifyContent: "space-between",
    display: "flex"
  },
  addItemContainer: {
    width: "65%",
    height: 620,
    marginLeft: 70,
    padding: 15,
    borderRadius: 15,
    float: "left",
    backgroundColor: "white",
    textAlign: "center",
    // margin: "auto",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  },
  requestContainer: {
    width: "25%",
    height: 620,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "white",
    float: "left",
    textAlign: "center",
    // margin: "auto",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  },
  button: {
    backgroundColor: "#CECECE", height: 35, borderRadius: 10, paddingLeft: 12, paddingRight: 12
  },
  clearButton: {
    backgroundColor: "#CECECE", margin: 10, height: 35, borderRadius: 10, paddingLeft: 12, paddingRight: 12, width: "20%"
  },
  addButton: {
    backgroundColor: "#FF6347", color: "white", margin: 10, height: 35, borderRadius: 10, paddingLeft: 12, paddingRight: 12, width: "20%"
  },
  requestedItemBox: {
    textAlign: "center", float: "left"
  },
  requestedItemName: {
    fontSize: 20, float: "left"
  },
  ImageContainer: {
    height: 125,
    width: 150
  },
  PreviewContainer: {
    display: "block",
    marginTop: -30
  },
  PreviewPiece: {
    marginBottom: 10
  },
  FileInput: {
    marginRight: "-30%",
  },
  Toggle: {
    borderRadius: 15,
    height: 50,
    marginRight: "1%",
    marginTop: "10%"
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
  icon: { marginLeft: 5, float: "left", height: 20, width: 20, marginTop: 3, marginRight: -3 },
  fontSizeMedium: {
    fontSize: 20,
    fontFamily: "sans-serif-light"
  },
  pageContainer: {
    float: "right"
  }
}));
