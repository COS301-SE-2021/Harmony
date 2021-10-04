import React from "react";
import { Grid } from "@material-ui/core";
import Widget from "../../components/Widget";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";
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
    radius: "25",
    timeLeft: "24 Days",
    status: "Active"
  }
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
        status: "Active"
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
        status: "Active"
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
        status: "Expired"
      }
    ]
  }
  return (
    <Grid container spacing={4}>
      {data.adverts.map((pairing) => (
        <>
          <br />
          <Grid item xs={5}>
            <Widget
              disableWidgetMenu
              noBodyPadding
              bodyClass={classes.tableWidget}
            >
              <div style={{ marginTop: -35, }}>
                <div className={classes.PreviewPiece}><img src={pairing.foodImage} className={classes.ImageContainer} /></div>
                <div className={classes.PreviewPiece}><img src={pairing.drinkImage} className={classes.ImageContainer} /></div>
              </div>
              <div style={{ clear: "both" }}></div>
              <div className={classes.justifySpaceBetText}>
                <div className={classes.floatLeft}>{pairing.foodName}</div>
                <div className={classes.floatLeft}>{pairing.drinkName}</div>
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
              </div><br />
              <div style={{ float: "left", textAlign: "center", marginLeft: 30 }}>
                <div className={classes.floatLeft}><p>Pairing tag: </p></div>
                <div style={{ justifyContent: 'space-around', display: "flex", float: 'left' }}>
                  <div className={classes.pairingChip}>{pairing.pairingTag}</div>
                </div>
              </div>
              <div style={{ clear: "both", textAlign: "center", marginLeft: 30 }}>
                <div className={classes.floatLeft}><p>Locations: </p></div>
                <div style={{ justifyContent: 'space-around', display: "flex", float: 'left' }}>
                  {pairing.Locations.map((item) => (
                    <div className={classes.locationsChip}>{item}</div>
                  ))}
                </div>
              </div>
              <div style={{ clear: "both", textAlign: "center", marginLeft: 30 }}>
                <div className={classes.floatLeft}><p>Radius: </p></div>
                <div style={{ justifyContent: 'space-around', display: "flex", float: 'left' }}>
                  <div><p style={{ marginLeft: "50%", marginRight: "50%" }}>{pairing.radius}</p></div>
                </div>
              </div>
              <div style={{ clear: "both", textAlign: "center", marginLeft: 30 }}>
                <div className={classes.floatLeft}><p>Time Left: </p></div>
                <div style={{ justifyContent: 'space-around', display: "flex", float: 'left' }}>
                  <div><p>{pairing.timeLeft}</p></div>
                </div>
              </div>
              <div style={{ clear: "both", textAlign: "center", marginLeft: 30 }}>
                <div className={classes.floatLeft}><p>Status: </p></div>
                <div style={{ justifyContent: 'space-around', display: "flex", float: 'left' }}>
                  {pairing.status == "Active" ? (<div className={classes.activeChip}>{pairing.status}</div>) : (<div className={classes.expiredChip}>{pairing.status}</div>)}

                </div>
              </div>
            </Widget>
          </Grid>
          <Grid item xs={5}>
            <Widget
              disableWidgetMenu
              noBodyPadding
              bodyClass={classes.tableWidget}
            >
              <LineChart
                width={100}
                height={30}
                data={[
                  { value: 10 },
                  { value: 15 },
                  { value: 10 },
                  { value: 17 },
                  { value: 18 },
                ]}
              >
                <Line
                  type="natural"
                  dataKey="value"
                  stroke="#3cd4a0"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </Widget>

          </Grid>
        </>
      ))}
    </Grid>
  );
}
