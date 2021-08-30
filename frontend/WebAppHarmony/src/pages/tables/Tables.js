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
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Churros", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Chocolate Cake", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Samoosa", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Fish and Chips", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Churros", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Chocolate Cake", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Samoosa", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Fish and Chips", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Churros", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Chocolate Cake", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Samoosa", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Fish and Chips", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Churros", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Chocolate Cake", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Samoosa", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Fish and Chips", "Regular", "50"],
];

const datatableData2 = [
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Churros", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Chocolate Cake", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Samoosa", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Fish and Chips", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Churros", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Chocolate Cake", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Samoosa", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Fish and Chips", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Churros", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Chocolate Cake", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Samoosa", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Fish and Chips", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Churros", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Chocolate Cake", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Samoosa", "Regular", "50"],
  ["8d198cb5-4008-49c9-8a6d-040809376919", "Fish and Chips", "Regular", "50"],
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
      <PageTitle title="Train AI" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Tags"
            data={datatableData}
            columns={["Tag ID ", "Name", "Type", "ImageCount"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
              title="Iterations"
              data={datatableData2}
              columns={["Id Iteration", "Name", "Status", "PublishName", "TrainingType"]}
          />
        </Grid>
      </Grid>
    </>
  );
}
