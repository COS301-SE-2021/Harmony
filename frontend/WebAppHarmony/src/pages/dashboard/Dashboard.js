import React, { useState, useEffect } from "react";
import {
  Grid
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";


// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";

const mainChartData = getMainChartData();
const PieChartData = [
  { name: "Group A", value: 400, color: "primary" },
  { name: "Group B", value: 300, color: "secondary" },
  { name: "Group C", value: 300, color: "warning" },
  { name: "Group D", value: 200, color: "success" },
];

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();

  // local
  var [mainChartState, setMainChartState] = useState("monthly");
  var [data, setData] = useState(" ");
  var [totalUsers, setTotalUsers] = useState("");
  var [mostFavouritedPairings, setMostFavouritedPairings] = useState([]);
  var [hitRatio, setHitRatio] = useState("");
  /**
   * @function runs once to load all the data for the dashboard
   */
  useEffect(() => {
    /**Get total users api  */
    fetch('https://w3lfp6r6f7.execute-api.eu-west-1.amazonaws.com/dev/gettotalusers')
      .then(response => response.json())
      .then(data => setTotalUsers(data.TotalUsers));

    /**Get hit ration call */
    fetch('https://w3lfp6r6f7.execute-api.eu-west-1.amazonaws.com/dev/viewratiodata')
      .then(response => response.json())
      .then(data => setHitRatio(data))
      .then(console.log("hit ratio " + JSON.stringify(hitRatio)));
    /**  empty dependency array means this effect will only run once (like componentDidMount in classes)*/
  }, []);
  return (
    <>
      <PageTitle title="Dashboard"/>
      <Grid container spacing={4}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Total Users"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <div style={{ width: "100%", textAlign: "right" }}>
                  <Grid item xs={6}>
                    <Typography size="xxl" weight="large" noWrap >
                      <p style={{ color: theme.palette.primary.main }}>{totalUsers}</p>
                    </Typography>
                  </Grid>
                </div>

              </Grid>
            </div>

          </Widget>
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>

          <Widget
            title="AI Performance"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={[classes.visitsNumberContainer, { justifyContent: "space-between" }]}>
              <Grid container item alignItems={"center"}>

                <Grid item xs={6}>
                  <Typography size="xxl" weight="large" noWrap>
                    <p style={{
                      color: "lightgreen", float: "left"
                    }}>{hitRatio.TrueScans}</p><p style={{
                      float: "left"
                    }}>:</p><p style={{
                      color: "red", float: "left"
                    }}>{hitRatio.FalseScans}</p>
                  </Typography>

                </Grid>
                <div className={[classes.performanceLegendWrapper, { justifyContent: "space-between" }]}>
                  <div className={classes.legendElement}>
                    <Dot color="success" />
                    <Typography
                      color="text"
                      colorBrightness="secondary"
                      className={classes.legendElementText}
                    >
                      Hits
                    </Typography>
                  </div>
                  <div className={classes.legendElement}>
                    <Dot color="secondary" />
                    <Typography
                      color="text"
                      colorBrightness="secondary"
                      className={classes.legendElementText}
                    >
                      Misses
                    </Typography>
                  </div>
                </div>
              </Grid>
            </div>

            <div className={classes.visitsNumberContainer}>
              <div style={{ width: "100%", textAlign: "center" }}>
                <Grid container item alignItems={"center"}>
                  <Grid item xs={6}>
                    <Typography color="text" colorBrightness="primary" >
                      Total Feedback :
                    </Typography>

                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="text" colorBrightness="secondary">
                      {hitRatio.TotalScans}
                    </Typography>

                  </Grid>

                </Grid>
              </div>
            </div>

          </Widget>

        </Grid>

        <Grid item sm={5} xs={12}>
          <BigStat title="Food Flavour Statistics" color="#C41ED4" />
        </Grid>
        {/* {mock.bigStat.map(stat => (

        ))} */}
      </Grid>
      <br />
      <br />
      <Grid item xs={12}>
        <Widget
          title="Most Favourited Pairings"
          upperTitle
          noBodyPadding
          bodyClass={classes.tableWidget}
        >
          <Table data={mostFavouritedPairings} />
        </Widget>
      </Grid>

    </>
  );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
