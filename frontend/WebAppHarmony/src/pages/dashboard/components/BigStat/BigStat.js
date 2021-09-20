import React, { useState, useEffect } from "react";
import { Grid, Select, MenuItem, Input } from "@material-ui/core";
import { ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Widget from "../../../../components/Widget";
import { Typography } from "../../../../components/Wrappers";

export default function BigStat(props) {
  var { product, total, color, registrations, bounce, title } = props;

  var classes = useStyles();
  var theme = useTheme();
  var [tableData, setTableData] = useState([]);
  useEffect(() => {

    fetch('https://w3lfp6r6f7.execute-api.eu-west-1.amazonaws.com/dev/getflavoursmostused')
      .then(response => response.json())
      .then(data => setTableData(data.Data))
      .then(console.log(tableData));
    /**  empty dependency array means this effect will only run once (like componentDidMount in classes)*/
  }, []);
  // local
  var [value, setValue] = useState("daily");

  return (
    <Widget
      header={
        <div className={classes.title}>
          <Typography variant="h5">Flavour Statistics</Typography>

          <Select
            value={value}
            onChange={e => setValue(e.target.value)}
            input={
              <Input
                disableUnderline
                classes={{ input: classes.selectInput }}
              />
            }
            className={classes.select}
          >
            <MenuItem value="meal">Meal</MenuItem>
            <MenuItem value="food">Food</MenuItem>
            <MenuItem value="drink">Drink</MenuItem>
          </Select>
        </div>
      }
      upperTitle
      bodyClass={classes.bodyWidgetOverflow}
    >
      <div className={classes.totalValueContainer}>
        {/* <div className={classes.totalValue}>
          <Typography size="xxl" color="text" colorBrightness="secondary">
            {total[value]}
          </Typography>
          <Typography color={total.percent.profit ? "success" : "secondary"}>
            &nbsp;{total.percent.profit ? "+" : "-"}
            {total.percent.value}%
          </Typography>
        </div> */}
        <BarChart width={450} height={200} data={tableData}>
          <Bar
            dataKey="Count"
            // fill={theme.palette[color].main}
            fill={color}
            radius={8}
            barSize={20}

          />
          <YAxis domain={[0, 10]} />
          {/* <Tooltip /> */}
          <XAxis dataKey="Flavour" />
        </BarChart>
      </div>
      {/* <div className={classes.bottomStatsContainer}>
        <div className={classnames(classes.statCell, classes.borderRight)}>
          <Grid container alignItems="center">
            <Typography variant="h6">{registrations[value].value}</Typography>
            <ArrowForwardIcon
              className={classnames(classes.profitArrow, {
                [!registrations[value].profit]: classes.profitArrowDanger,
              })}
            />
          </Grid>
          <Typography size="sm" color="text" colorBrightness="secondary">
            Registrations
          </Typography>
        </div>
        <div className={classes.statCell}>
          <Grid container alignItems="center">
            <Typography variant="h6">{bounce[value].value}%</Typography>
            <ArrowForwardIcon
              className={classnames(classes.profitArrow, {
                [!registrations[value].profit]: classes.profitArrowDanger,
              })}
            />
          </Grid>
          <Typography size="sm" color="text" colorBrightness="secondary">
            Bounce Rate
          </Typography>
        </div>
        <div className={classnames(classes.statCell, classes.borderRight)}>
          <Grid container alignItems="center">
            <Typography variant="h6">
              {registrations[value].value * 10}
            </Typography>
            <ArrowForwardIcon
              className={classnames(classes.profitArrow, {
                [classes.profitArrowDanger]: !registrations[value].profit,
              })}
            />
          </Grid>
          <Typography size="sm" color="text" colorBrightness="secondary">
            Views
          </Typography>
        </div>
      </div> */}
    </Widget>
  );
}

// #######################################################################

function getRandomData() {
  return Array(7)
    .fill()
    .map(() => ({ value: Math.floor(Math.random() * 10) + 1 }));
}
