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

  button: {
    backgroundColor: "#CECECE", height: 35, borderRadius: 10, paddingLeft: 12, paddingRight: 12
  },

  buttonContainer: {
    float: "auto",
  },
  marginAuto: {
    margin: "auto",
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
  icon: { float: "right", height: 20, width: 20, marginTop: 15, marginBottom: 0 },

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
