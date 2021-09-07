import PageTitle from "../../components/PageTitle";
import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import {Container, Button, Grid, TextField} from "@material-ui/core";
import  { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})


export default function DataTable() {
  const classes = useStyles()
  const [posts1, setPost1] = useState([]);
  const [posts3, setPost3] = useState([]);
  const [posts, setPost] = useState([]);



  let signal = axios.CancelToken.source();

  useEffect(() => {
    let isSubscribed = true;
    axios.get(`https://w3lfp6r6f7.execute-api.eu-west-1.amazonaws.com/dev/getuserfeedback`, {
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

  useEffect(() => {
    let isSubscribed = true;
    axios.get(`https://jsonplaceholder.typicode.com/photos`, {
      cancelToken: signal.token,
    })
        .then(res => {
          const posts3 = res.data;
          setPost3(posts3);
        }).catch(err => {
      console.log(err);
    });
    return function cleanup() {
      isSubscribed = false;
      signal.cancel('Api is being canceled');
    }
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    axios.get(`https://mocki.io/v1/9f39d9f9-2ed7-46cf-848d-2f6e9089767e`, {
      cancelToken: signal.token,
    })
        .then(res => {
          const posts1 = res.data;
          setPost1(posts1);
        }).catch(err => {
      console.log(err);
    });
    return function cleanup() {
      isSubscribed = false;
      signal.cancel('Api is being canceled');
    }
  }, []);

  const columns1 = [
    {label: "UFID", name: "UFID" },
    {label: "FoodName", name:"FoodName" },
    {label:"Date Scanned", name:"DateScanned" },
    {label:"Correctly Identified", name:"CorrectlyIdentified"},
    {label:"FoodImage", name:"FoodImage"}
  ]
  const columns = [
    {label: "userId", name: "userId" },
    {label: "ID", name:"id" },
    {label:"title", name:"title" },
    {label:"body", name:"body" }
    ]

  const columns3 = [
    {label: "userId", name: "albumId" },
    {label: "ID", name:"id" },
    {label:"title", name:"title" },
    {label:"body", name:"url" }
  ]
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
        <PageTitle title="User Feedback on Harmony AI"/>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MUIDataTable
                title={"User Feedback Table"}
                data={posts1}
                columns={columns1}
                options={options}
            />
          </Grid>
        </Grid>
      </>
  );
}
