import React from "react";
import { Grid } from "@material-ui/core";
import Widget from "../../components/Widget";
// styles
import useStyles from "./styles";
import { Typography } from "../../components/Wrappers";

export default function AdvertsPage() {
  var classes = useStyles();

  const data = {
    adverts: [
      {
        foodImage: "https://thestayathomechef.com/wp-content/uploads/2016/06/The-Most-Amazing-Chocolate-Cake-2-e1598548411160.jpg",
        drinkImage: "https://www.gardeningknowhow.com/wp-content/uploads/2012/09/herbal-tea-1.jpg",
        foodName: "Cake",
        drinkName: "Tea",
        Locations: ["Durban", "Pretoria", "Westville"],
        foodTags: ["Sweet", "Warm"],
        drinkTags: ["Warm", "Sweet"],
        pairingTag: "Snack",
        radius: "25",
        timeLeft: "24 Days",
        status: "Active",
        dateCreated: "04/10/2021",
        totalClicks: 32,
        averageViewTime: 1.24,
        totalViewTime: 39.68
      },
      {
        foodImage: "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216054.jpg",
        drinkImage: "https://images2.minutemediacdn.com/image/upload/c_crop,h_1191,w_2119,x_0,y_111/f_auto,q_auto,w_1100/v1617716394/shape/mentalfloss/643219-gettyimages-1248993201.jpg",
        foodName: "Pizza",
        drinkName: "Beer",
        Locations: ["Umhlanga", "Ballto"],
        foodTags: ["Savoury", "Spicy", "Hot"],
        drinkTags: ["Cold", "Alcoholic", "Fizzy"],
        pairingTag: "Lunch",
        radius: "35",
        timeLeft: "5 Days",
        status: "Active",
        dateCreated: "29/09/2021",
        totalClicks: 142,
        averageViewTime: 2.59,
        totalViewTime: 367.78
      },
      {
        foodImage: "https://media-cdn.tripadvisor.com/media/photo-s/0f/12/94/43/canecutters.jpg",
        drinkImage: "https://www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/108098914/coca-cola-soda-ice.jpg?quality=82&strip=all",
        foodName: "Bunny Chow",
        drinkName: "Coke",
        Locations: ["Durban", "Pretoria East", "Umhlanga"],
        foodTags: ["Spicy", "Hot"],
        drinkTags: ["Cold", "Fizzy"],
        pairingTag: "Supper",
        radius: "25",
        timeLeft: "0 Days",
        status: "Expired",
        dateCreated: "26/09/2021",
        totalClicks: 219,
        averageViewTime: 5.42,
        totalViewTime: 1186.98
      }
    ]
  }

  return (
    <Grid container spacing={4} >
      {data.adverts.map((pairing) => (
        <>
          <br />
          <Grid item xs={6} style={{ marginRight: "5%" }}>
            <Widget
              disableWidgetMenu
              noBodyPadding
              bodyClass={classes.tableWidget}
            >
              <div style={{ marginTop: -35, }}>
                <div className={classes.PreviewPiece}><img src={pairing.foodImage} className={classes.ImageContainer} /></div>
                <div className={classes.PreviewPiece}><img src={pairing.drinkImage} className={classes.ImageContainer} /></div>
              </div>
              <div className={classes.justifySpaceBetText}>
                <div className={classes.floatLeft}>
                  <Typography size="md" weight="bold">
                    {pairing.foodName}
                  </Typography>
                </div>
                <div className={classes.floatLeft}>
                  <Typography size="md" weight="bold">
                    {pairing.drinkName}
                  </Typography>
                </div>
              </div>

              <div className={classes.justifySpaceBet}>
                <div className={classes.floatLeft}>
                  {pairing.foodTags.map((item) => (
                    <div className={classes.foodChip}>{item}</div>
                  ))}
                </div>
                <div className={classes.floatLeft}>
                  {pairing.drinkTags.map((item) => (
                    <div className={classes.drinkChip}>{item}</div>
                  ))}
                </div>
              </div>

              <div style={{ float: "left", textAlign: "center", marginLeft: 30 }}>
                <div className={classes.floatLeft}><p className={classes.label}>Pairing tag: </p></div>
                <div style={{ justifyContent: 'space-around', display: "flex", float: 'left' }}>
                  <div className={classes.pairingChip}>{pairing.pairingTag}</div>
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
                  <div><p style={{ marginLeft: "50%", marginTop: 17, fontSize: 20 }}>{pairing.radius}</p></div>
                </div>
              </div>
              <div className={classes.textWrapper}>
                <div className={classes.floatLeft}><p className={classes.label}>Time Left: </p></div>
                <div style={{ justifyContent: 'space-around', display: "flex", float: 'left', width: "15%" }}>
                  <div><p style={{ marginTop: 17, fontSize: 20 }}>{pairing.timeLeft}</p></div>
                </div>
              </div>
              <div className={classes.textWrapper}>
                <div className={classes.floatLeft}><p className={classes.label}>Date Created: </p></div>
                <div style={{ justifyContent: 'space-around', display: "flex", float: 'left' }}>
                  <div ><p style={{ marginLeft: "20%", marginTop: 17, fontSize: 20 }}>{pairing.dateCreated}</p></div>
                </div>
              </div>
              <div className={classes.textWrapper}>
                <div className={classes.floatLeft}><p className={classes.label}>Status: </p></div>
                <div style={{ justifyContent: 'space-around', display: "flex", float: 'left' }}>
                  {pairing.status == "Active" ? (<div className={classes.activeChip}>{pairing.status}</div>) : (<div className={classes.expiredChip}>{pairing.status}</div>)}

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
                  <p style={{ marginTop: 15, paddingTop: 13 }}> {pairing.totalClicks} Clicks</p>
                </div>
                <Typography size="md" weight="bold">
                  Average viewing time on the ad:
                </Typography>
                <div className={classes.statsChip}>
                  <p style={{ marginTop: 15, paddingTop: 13 }}> {pairing.averageViewTime} Seconds</p>
                </div>
                <Typography size="md" weight="bold">
                  Total time users viewed the advert:
                </Typography>
                <div className={classes.statsChip}>
                  <p style={{ marginTop: 15, paddingTop: 13 }}> {pairing.totalViewTime} Seconds</p>
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
