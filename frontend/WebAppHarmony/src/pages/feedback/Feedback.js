import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";

const datatableData = [
  ["Churros", "Correct"],
  ["Chocolate Cake", "Incorrect"],
  ["Samoosa", "Incorrect"],
  ["Fish and Chips", "Correct"],
  ["Churros", "Correct"],
  ["Chocolate Cake", "Incorrect"],
  ["Samoosa", "Incorrect"],
  ["Fish and Chips", "Correct"],
  ["Churros", "Correct"],
  ["Chocolate Cake", "Incorrect"],
  ["Samoosa", "Incorrect"],
  ["Fish and Chips", "Correct"],
  ["Churros", "Correct"],
  ["Chocolate Cake", "Incorrect"],
  ["Samoosa", "Incorrect"],
  ["Fish and Chips", "Correct"],
];


const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Tables() {
  const classes = useStyles();
  return (
    <>
      <PageTitle title="User Feedback" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Tags"
            data={datatableData}
            columns={["Item Name", "Type", "Image"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
