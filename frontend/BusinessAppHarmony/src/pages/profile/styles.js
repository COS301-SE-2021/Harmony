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
  formLabel: {
    fontSize: 20,
    width: 150,
    justifyContent: "space-between",
    display: "flex",
    marginTop: 15
  },

  formElementsImageContainer: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 15,
    justifyContent: "space-around",
    display: "flex",
  },
  button: {
    backgroundColor: "#CECECE", height: 35, borderRadius: 10, paddingLeft: 12, paddingRight: 12
  },
  marginAuto: {
    margin: "auto",
  },
  addButton: {
    backgroundColor: theme.palette.primary.main, color: "white", marginLeft: 65, height: 35, borderRadius: 10, paddingLeft: 12, paddingRight: 12, width: "50%",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)"

  },
  addButtonLogo: {
    backgroundColor: theme.palette.primary.main, color: "white", marginLeft: 45, height: 35, borderRadius: 10, paddingLeft: 12, paddingRight: 12, width: "70%",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)"

  },
  addLocationButton: {
    backgroundColor: theme.palette.primary.main, color: "white", marginLeft: 35, height: 40, borderRadius: 10, width: "50%",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)",
    float: "left"
  },
  ClearButton: {
    backgroundColor: "#CECECE", marginLeft: 55, height: 40, borderRadius: 10, width: "20%",
    boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)",
    float: "left"
  },

  ImageContainer: {
    height: 100,
    width: 120,
    borderRadius: 5,
    marginLeft: 15,
    marginTop: -20
  },
  PreviewPiece: {
    marginBottom: 10,
    marginLeft: "25%"
  },
  icon: { float: "right", height: 20, width: 20, marginTop: 15, marginBottom: 0 },

  floatLeft: {
    float: "left",
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
    width: "100%"
  }
}));
