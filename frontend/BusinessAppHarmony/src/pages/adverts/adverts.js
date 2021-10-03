import React from "react";
import { Grid } from "@material-ui/core";
import Widget from "../../components/Widget";

// styles
import useStyles from "./styles";

export default function AdvertsPage() {
  var classes = useStyles();

  const oneData = {
    foodImage: "http://beepeers.com/assets/images/commerces/default-image.jpg",
    drinkImage: "http://beepeers.com/assets/images/commerces/default-image.jpg",
    foodName: "Cake",
    drinkName: "Tea",
    Locations: ["Durban", "Pretoria", "Westville"],
    foodTags: ["Sweet", "Warm"],
    drinkTags: ["Warm", "Sweet"],
    pairingTag: ["Snack"],
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
        pairingTag: ["Snack"],
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
        pairingTag: ["Snack"],
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
        pairingTag: ["Snack"],
        radius: ["25"],
        timeLeft: "24 Days",
        status: "Active"
      }
    ]
  }
  return (
    <>
      <Grid container spacing={4}>
        <Widget
          disableWidgetMenu
          bodyClass={classes.tableWidget}
        >
          <div>
            <div className={classes.PreviewPiece}><img src={oneData.foodImage} className={classes.ImageContainer} /></div>
            <div className={classes.PreviewPiece}><img src={oneData.drinkImage} className={classes.ImageContainer} /></div>
          </div>
        </Widget>
      </Grid>
    </>
  );
}
