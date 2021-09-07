import PageTitle from "../../components/PageTitle";
import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import {Container, Button, Grid, TextField} from "@material-ui/core";
import { MaterialUIFormSubmit } from "../../components/MaterialUIFormSubmit";


export default function DataTable() {
  const [posts, setPost] = useState([]);
  const [posts1, setPost1] = useState([]);
  const [posts2, setPost2] = useState([]);
  const [posts3, setPost3] = useState([]);




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
  const columns = [
    {label: "userId", name: "userId" },
    {label: "ID", name:"id" },
    {label:"title", name:"title" },
    {label:"body", name:"body" }
  ]



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




  useEffect(() => {
    let isSubscribed = true;
    axios.get(`https://mocki.io/v1/64dfb5a2-0cd9-4483-8dce-a2ef4db47f36`, {
      cancelToken: signal.token,
    })
        .then(res => {
          const posts2 = res.data;
          setPost2(posts2);
        }).catch(err => {
      console.log(err);
    });
    return function cleanup() {
      isSubscribed = false;
      signal.cancel('Api is being canceled');
    }
  }, []);
  const columns2 = [
    {label: "Tag ID", name: "id" },
    {label: "Tag Name", name:"name" },
    {label:"Type of Tag", name:"type" }
  ];







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
        <Grid container spacing={4}>
        <Grid item xs={6}>
          <MUIDataTable
              title={"Food Tags"}
              data={posts2}
              columns={columns2}
              options={options}
          />
        </Grid>
        <Grid item xs={6}>
          <div className="App">
            <MaterialUIFormSubmit
                formName="Add new Image to Training Set"
                formDescription="Using TagID and Image URL from the Feedback, You can add images to AI DataSet."
            />
          </div>
        </Grid>
        </Grid>
      </>
  );
}
