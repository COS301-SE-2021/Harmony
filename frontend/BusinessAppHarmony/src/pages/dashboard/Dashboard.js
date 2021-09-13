import React, { useState } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
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
import MUIDataTable from "mui-datatables";
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
import Statement from "./Statement";
const mainChartData = getMainChartData();

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();

  // local
  var [mainChartState, setMainChartState] = useState("monthly");
  const datatableData = [
    ["Churros and Tea", "Advert", "45"],
    ["Chocolate Cake and Coffee", "Advert", "32"],
    ["Samoosa and Chai", "Advert", "28"],
    ["Chicken Wings and Beer", "Advert", "47"],
    ["Chicken Curry and Coke", "Advert", "38"],
    ["Mutton Bunny Chow and Coke", "Advert", "63"],
  ];


  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <>
      <PageTitle title="Balance" />
      <Grid container spacing={4}>

        <Grid item xs={12}>
          <ResponsiveContainer width="100%" minWidth={500} >
            <MUIDataTable
              title={<Typography size="xl" weight="medium" colorBrightness="secondary" noWrap>
                Remaining balance on account
              </Typography>
              }
              data={datatableData}
              columns={["Name", "Type", "Cost (R)"]}
              options={{
                download: true,
                fixedSelectColumn: false,
                rowsPerPage: 5,
                rowsPerPageOptions: [5, 10, 15, 25]
              }}
            />
          </ResponsiveContainer>
        </Grid>
        {/* {mock.bigStat.map(stat => (
          <Grid item md={4} sm={6} xs={12} key={stat.product}>
            <BigStat {...stat} />
          </Grid>
        ))} */}
        <Grid item xs={12}>
          <Widget
            title={<Typography size="xl" weight="medium" colorBrightness="secondary" noWrap>
              Remaining balance on account
            </Typography>
            }
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Statement />
          </Widget>
        </Grid>

        <Table data={mock.table} />


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
