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

  ImageContainer: {
    height: 185,
    width: "100%",
    borderRadius: 5,
  },

  PreviewContainer: {
    display: "block",
    width: "50%",
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
    width: "50%",
    height: 185,
    float: "left",
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
  foodChip: {
    backgroundColor: "#FF6347",
    color: "white",
    padding: 4,
    textAlign: "center",
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 6,
    marginRight: 6,
    float: "left",

  },
  drinkChip: {
    backgroundColor: "#1FBFBA",
    float: "left",
    color: "white",
    padding: 4,
    textAlign: "center",
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 6,
    marginRight: 6,
  },
  pairingChip: {
    backgroundColor: "#C41ED4",
    float: "left",
    color: "white",
    padding: 4,
    textAlign: "center",
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 13,
    marginLeft: 10,
  },
  locationsChip: {
    backgroundColor: "#4CD41E",
    float: "left",
    color: "white",
    padding: 4,
    textAlign: "center",
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 13,
    marginLeft: 6,
    marginRight: 6,
  },
  activeChip: {
    backgroundColor: "#3cd4a0",
    float: "left",
    color: "white",
    padding: 4,
    textAlign: "center",
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 13,
    marginLeft: 10,
  },
  expiredChip: {
    backgroundColor: "#FF2222",
    float: "left",
    color: "white",
    padding: 4,
    textAlign: "center",
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 13,
    marginLeft: 10,
  },
  statsChip: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    textAlign: "center",
    borderRadius: 15,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 25,
    width: "70%",
    height: 60,
    fontWeight: "bold",
    margin: "auto",
    marginBottom: 15
  },
  textWrapper: {
    clear: "both",
    textAlign: "center",
    marginLeft: 30,

  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  }

}));
