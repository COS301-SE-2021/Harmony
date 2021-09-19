import PageTitle from "../../components/PageTitle";
import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { Grid } from "@material-ui/core";

export default function DataTable() {
  const [posts, setPost] = useState([]);
  let signal = axios.CancelToken.source();

  useEffect(() => {
    let isSubscribed = true;
    axios.get(`https://jsonplaceholder.typicode.com/posts`, {
      cancelToken: signal.token,
    })
        .then(res => {
          const posts = res.data;
          setPost(posts);
        }).catch(err => {
      console.log(err);
    });
    return function cleanup() {
      isSubscribed = false;
      signal.cancel('Api is being canceled');
    }
  }, []);

  const columns = ["userId", "id", "title", "body"];

  const options = {
    filter: true,
    filterType: "dropdown",
    print: true,
    viewColumns: true,
    selectableRows: 'none',
    onRowClick: (rowData) => {
      console.log("RowClicked->", rowData);
    },
    responsive: "stacked",
    fixedHeaderOptions: {
      xAxis: false,
      yAxis: true,
    },
  };


  return (
      <>
        <PageTitle title="Train AI"/>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MUIDataTable
                title={"Posts"}
                data={posts}
                columns={columns}
                options={options}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MUIDataTable
                title={"Posts"}
                data={posts}
                columns={columns}
                options={options}
            />
          </Grid>
        </Grid>
      </>
  );
}
