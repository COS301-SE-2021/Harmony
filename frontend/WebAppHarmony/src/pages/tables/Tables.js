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
  {Id: "8d198cb5-4008-49c9-8a6d-040809376919", name1: "Churros", type1: "Regular", count1: "50"},
  {Id: "8d198cb5-4008-49c9-8a6d-040809376919", name1: "Churros", type1: "Regular", count1: "50"},
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

    const [data, setData] = React.useState([])
    const columns = [
      { title: "ID", field: "id" },
      { title: "Username", field: "username" },
      { title: "Name", field: "name" },
      { title: "Email", field: "email" },
      { title: "Phone", field: "phone" },
      { title: "Web Link", field: 'website' }
    ]
    React.useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
          .then(resp => resp.json())
          .then(resp => {
            setData(resp)
          })
    }, [])
    return (
        <>
          <PageTitle title="Train AI"/>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <MUIDataTable
                  title="Tags"
                  data={data}
                  columns={columns}
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
