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
          <Typography variant="h5">Tags Statistics</Typography>

        </div>
      }
      upperTitle
      bodyClass={classes.bodyWidgetOverflow}
    >
      <div className={classes.totalValueContainer}>

        <BarChart width={450} height={200} data={tableData}>
          <Bar
            dataKey="Count"
            fill={color}
            radius={8}
            barSize={20}

          />
          <YAxis domain={[0, 18]} />
          <XAxis dataKey="Flavour" />
        </BarChart>
      </div>
    </Widget>
  );
}
