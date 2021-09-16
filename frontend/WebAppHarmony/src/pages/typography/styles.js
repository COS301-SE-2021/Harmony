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
  individualTextField: {
    width: "65%",
    height: 10,
  },
  individualTextFieldDescription: {
    width: "68%",
    height: 100,
    padding: 15,
  },
  formLabel: {
    marginTop: 10,
    fontSize: 20
  },
  formElements: {
    marginTop: 15,
    borderRadius: 15,
    justifyContent: "space-between",
    display: "flex"
  },
  formElementsDescription: {
    marginBottom: 40,
    borderRadius: 15,
    justifyContent: "space-between",
    display: "flex",
    height: 100,
    marginRight: -15,
    marginTop: 10

  },
  addItemContainer: {
    width: "65%",
    height: 620,
    marginLeft: 70,
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
    width: 200,
  },
  requestedItemName: {
    fontSize: 15, float: "left", textAlign: "left", width: 170, height: 30, overflow: "hidden",
  },
  ImageContainer: {
    height: 125,
    width: 150,
    borderRadius: 5
  },
  PreviewContainer: {
    display: "block",
    marginTop: -30
  },
  uploadImageButton: {
    backgroundColor: theme.palette.primary.main,
    height: 35, borderRadius: 5, paddingLeft: 10, paddingRight: 10, fontSize: 13, marginTop: -5,
    float: "none", color: 'white', fontWeight: "bold",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)"
  },
  PreviewPiece: {
    marginBottom: 10,
  },
  FileInput: {
    marginRight: "-30%",
  },
  Toggle: {
    borderRadius: 15,
    height: 50,
    width: 150,
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
  icon: { float: "right", marginTop: 15, marginRight: 10, marginBottom: 0 },
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
    fontSize: 18,
    color: "#717171"
  },
  errorDivTags: {
    fontSize: 18,
    color: "#717171",
    marginTop: -8
  },
  errorDivType: {
    fontSize: 18,
    color: "#717171",
    marginTop: 80,

  },
  color: {
    backgroundColor: theme.palette.primary.main,
  },
  tableRowHeader: {
    backgroundColor: theme.palette.primary.main,
  },
  tableCell: {
    color: "white"
  }

}));
