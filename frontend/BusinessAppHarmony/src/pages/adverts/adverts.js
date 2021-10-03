import React from "react";
import { Grid } from "@material-ui/core";
import Widget from "../../components/Widget";

// styles
import useStyles from "./styles";

export default function AdvertsPage() {
  var classes = useStyles();

  const oneData = {
    foodImage: "https://thestayathomechef.com/wp-content/uploads/2016/06/The-Most-Amazing-Chocolate-Cake-2-e1598548411160.jpg",
    drinkImage: "https://www.gardeningknowhow.com/wp-content/uploads/2012/09/herbal-tea-1-400x300.jpg",
    foodName: "Cake",
    drinkName: "Tea",
    Locations: ["Durban", "Pretoria", "Westville"],
    foodTags: ["Sweet", "Warm"],
    drinkTags: ["Warm", "Sweet"],
    pairingTag: "Snack",
    radius: ["25"],
    timeLeft: "24 Days",
    status: "Active"
  }
  const data = {
    adverts: [
      {
        foodImage: "http://beepeers.com/assets/images/commerces/default-image.jpg",
        drinkImage: "http://beepeers.com/assets/images/commerces/default-image.jpg",
        foodName: "Cake",
        drinkName: "Tea",
        Locations: ["Durban", "Pretoria", "Westville"],
        foodTags: ["Sweet", "Warm"],
        drinkTags: ["Warm", "Sweet"],
        pairingTag: "Snack",
        radius: ["25"],
        timeLeft: "24 Days",
        status: "Active"
      },
      {
        foodImage: "http://beepeers.com/assets/images/commerces/default-image.jpg",
        drinkImage: "http://beepeers.com/assets/images/commerces/default-image.jpg",
        foodName: "Cake",
        drinkName: "Tea",
        Locations: ["Durban", "Pretoria", "Westville"],
        foodTags: ["Sweet", "Warm"],
        drinkTags: ["Warm", "Sweet"],
        pairingTag: "Snack",
        radius: ["25"],
        timeLeft: "24 Days",
        status: "Active"
      },
      {
        foodImage: "http://beepeers.com/assets/images/commerces/default-image.jpg",
        drinkImage: "http://beepeers.com/assets/images/commerces/default-image.jpg",
        foodName: "Cake",
        drinkName: "Tea",
        Locations: ["Durban", "Pretoria", "Westville"],
        foodTags: ["Sweet", "Warm"],
        drinkTags: ["Warm", "Sweet"],
        pairingTag: "Snack",
        radius: ["25"],
        timeLeft: "24 Days",
        status: "Active"
      }
    ]
  }
  return (
    <>
      <br />
      <Grid container spacing={4}>
        <Widget
          disableWidgetMenu
          noBodyPadding
          bodyClass={classes.tableWidget}
        >
          <div style={{ marginTop: -35 }}>
            <div className={classes.PreviewPiece}><img src={oneData.foodImage} className={classes.ImageContainer} /></div>
            <div className={classes.PreviewPiece}><img src={oneData.drinkImage} className={classes.ImageContainer} /></div>
          </div>
          <div className={classes.justifySpaceBet}>
            <div className={classes.floatLeft}>{oneData.foodName}</div>
            <div className={classes.floatLeft}>{oneData.drinkName}</div>
          </div>
          <div className={classes.justifySpaceBet}>
            <div className={classes.floatLeft}>
              {oneData.foodTags.map((item) => (
                <div className={classes.foodChip}>{item}</div>
              ))}
            </div>
            <div className={classes.floatLeft}>
              {oneData.drinkTags.map((item) => (
                <div className={classes.drinkChip}>{item}</div>
              ))}
            </div>
          </div><br />
          <div style={{ float: "left", textAlign: "center", marginLeft: 30 }}>
            <div className={classes.floatLeft}><p>Pairing tag: </p></div>
            <div style={{ justifyContent: 'space-around', display: "flex", float: 'left' }}>
              <div className={classes.pairingChip}>{oneData.pairingTag}</div>
            </div>
          </div>
        </Widget>
      </Grid>

    </>
  );
}
