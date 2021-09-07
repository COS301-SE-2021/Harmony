import PageTitle from "../../components/PageTitle";
import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import {Container, Button, Grid, TextField} from "@material-ui/core";
import  { makeStyles } from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})


export default function DataTable() {
  const classes = useStyles()
  const [tag, setTag]  = useState('');
  const [posts, setPost] = useState([]);

  const handleSubmit  = (e) => {
    e.preventDefault();
  }



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
                title={"Food Tags"}
                data={posts}
                columns={columns}
                options={options}
            />
          </Grid>
        </Grid>

        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={3}>
              <TextField
                  onChange={(e) => setTag(e.target.value)}
                  className={classes.field}
                  label="New Tag"
                  variant="outlined"
                  color = "secondary"
                  fullWidth
                  required
              />
            </Grid>

          <Grid item xs={1}>
            <Button
              onClick={() => console.log('uouclocked')}
              type="submit"
              color="primary"
              variant="contained"
              endIcon={<KeyboardArrowRightIcon/>}
            >
              Submit
          </Button>
          </Grid>
          </Grid>
        </form>


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
