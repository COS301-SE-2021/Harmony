import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Widget from "../../components/Widget";
import { Auth } from 'aws-amplify';
// styles
import useStyles from "./styles";
import { Typography } from "../../components/Wrappers";

export default function AdvertsPage() {
  var classes = useStyles();

  const [advertData, setAdvertData] = useState({
    Adverts: [{
      Locations: [],
      FoodTags: [],
      DrinkTags: [],
    }]
  })
  useEffect(() => {
    /**load recommendations */
    fetch("https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/getbusinessads", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ BID:  Auth.user.username })
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setAdvertData(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
        }
      )
  }, [])

  const data = {
    Adverts: [
      {
        FoodImage: "https://thestayathomechef.com/wp-content/uploads/2016/06/The-Most-Amazing-Chocolate-Cake-2-e1598548411160.jpg",
        DrinkImage: "https://www.gardeningknowhow.com/wp-content/uploads/2012/09/herbal-tea-1.jpg",
        FoodName: "Cake",
        DrinkName: "Tea",
        Locations: ["Durban", "Pretoria", "Westville"],
        FoodTags: ["Sweet", "Warm"],
        DrinkTags: ["Warm", "Sweet"],
        PairingTags: "Snack",
        Radius: "25",
        TimeLeft: "24 Days",
        Status: "Active",
        DateCreated: "04/10/2021",
        NumberOfClicks: 32,
        AverageTime: 1.24,
        TotalTime: 39.68
      },

    ]
  }

  return (
    <Grid container spacing={4} >
      {advertData.Adverts.map((pairing) => (
        <>
          <br />
          <Grid item xs={6} style={{ marginRight: "5%" }}>
            <Widget
              disableWidgetMenu
              noBodyPadding
              bodyClass={classes.tableWidget}
            >
              <div style={{ marginTop: -35, }}>
                <div className={classes.PreviewPiece}><img src={pairing.FoodImage} className={classes.ImageContainer} /></div>
                <div className={classes.PreviewPiece}><img src={pairing.DrinkImage} className={classes.ImageContainer} /></div>
              </div>
              <div className={classes.justifySpaceBetText}>
                <div className={classes.floatLeft}>
                  <Typography size="md" weight="bold">
                    {pairing.FoodName}
                  </Typography>
                </div>
                <div className={classes.floatLeft}>
                  <Typography size="md" weight="bold">
                    {pairing.DrinkName}
                  </Typography>
                </div>
              </div>

              <div className={classes.justifySpaceBet}>
                <div className={classes.floatLeft}>
                  {pairing.FoodTags.map((item) => (
                    <div className={classes.foodChip}>{item}</div>
                  ))}
                </div>
                <div className={classes.floatLeft}>
                  {pairing.DrinkTags.map((item) => (
                    <div className={classes.drinkChip}>{item}</div>
                  ))}
                </div>
              </div>

              <div style={{ float: "left", textAlign: "center", marginLeft: 30 }}>
                <div className={classes.floatLeft}><p className={classes.label}>Pairing tag: </p></div>
                <div style={{ justifyContent: 'space-around', display: "flex", float: 'left' }}>
                  <div className={classes.pairingChip}>{pairing.PairingTags}</div>
                </div>
              </div>
              <div className={classes.textWrapper}>
                <div className={classes.floatLeft}><p className={classes.label}>Locations: </p></div>
                <div style={{ justifyContent: 'space-around', display: "flex", float: 'left' }}>
                  {pairing.Locations.map((item) => (
                    <div className={classes.locationsChip}>{item}</div>
                  ))}
                </div>
              </div>
              <div className={classes.textWrapper}>
                <div className={classes.floatLeft}><p className={classes.label}>Radius: </p></div>
                <div style={{ justifyContent: 'space-around', display: "flex", float: 'left' }}>
                  <div><p style={{ marginLeft: "50%", marginTop: 17, fontSize: 20, width: "100%" }}>{pairing.Radius} KMs</p></div>
                </div>
              </div>
              <div className={classes.textWrapper}>
                <div className={classes.floatLeft}><p className={classes.label}>Time Left: </p></div>
                <div style={{ justifyContent: 'space-around', display: "flex", float: 'left', width: "15%" }}>
                  <div><p style={{ marginTop: 17, fontSize: 20, width: "100%" }}>{pairing.timeLeft}</p></div>
                </div>
              </div>
              <div className={classes.textWrapper}>
                <div className={classes.floatLeft}><p className={classes.label}>Date Created: </p></div>
                <div style={{ justifyContent: 'space-around', display: "flex", float: 'left' }}>
                  <div ><p style={{ marginLeft: "10%", marginTop: 17, fontSize: 20, width: "100%" }}>{pairing.DateCreated}</p></div>
                </div>
              </div>
              <div className={classes.textWrapper}>
                <div className={classes.floatLeft}><p className={classes.label}>Status: </p></div>
                <div style={{ justifyContent: 'space-around', display: "flex", float: 'left' }}>
                  {pairing.Status == "Active" ? (<div className={classes.activeChip}>{pairing.Status}</div>) : (<div className={classes.expiredChip}>{pairing.status}</div>)}

                </div>
              </div>
            </Widget>
          </Grid>
          <Grid item xs={5}>
            <Widget
              disableWidgetMenu
            >
              <div style={{ width: "100%", textAlign: "center" }}>
                <Typography size="md" weight="bold">
                  Total clicks from date created:
                </Typography>
                <div className={classes.statsChip}>
                  <p style={{ marginTop: 15, paddingTop: 13 }}> {pairing.NumberOfClicks} Clicks</p>
                </div>
                <Typography size="md" weight="bold">
                  Average viewing time on the ad:
                </Typography>
                <div className={classes.statsChip}>
                  <p style={{ marginTop: 15, paddingTop: 13 }}> {pairing.AverageTime} </p>
                </div>
                <Typography size="md" weight="bold">
                  Total time users viewed the advert:
                </Typography>
                <div className={classes.statsChip}>
                  <p style={{ marginTop: 15, paddingTop: 13 }}> {pairing.TotalTime} </p>
                </div>
              </div>
            </Widget>

          </Grid>
        </>
      ))
      }
    </Grid >
  );
}
