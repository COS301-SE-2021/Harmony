import PageTitle from "../../components/PageTitle";
import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import {Grid} from "@material-ui/core";
import { FormSubmit_ImageUrl } from "../../components/Forms/FormSubmit_ImageUrl";


export default function DataTable() {
  const [posts, setPost] = useState([]);
  const [posts2, setPost2] = useState([]);


  /**Get User feedback Table */

  let signal = axios.CancelToken.source();
  useEffect(() => {
    axios.get(`https://w3lfp6r6f7.execute-api.eu-west-1.amazonaws.com/dev/getuserfeedback`, {
      cancelToken: signal.token,
    })
        .then(res => {
          const posts = res.data.Data;
          setPost(posts);
        }).catch(err => {
      console.log(err);
    });


  }, []);
  const columns = [
    {label: "UFID", name: "UFID" },
    {label: "FoodName", name:"FoodName" },
    {label:"Date Scanned", name:"DateScanned" },
    {label:"Correctly Identified", name:"CorrectlyIdentified"},
    {label:"FoodImage", name:"FoodImage"}
  ]




  /**Get Tags Table */
  useEffect(() => {
    axios.get(`https://7q0027151j.execute-api.eu-west-1.amazonaws.com/dev/gettags`, {
      cancelToken: signal.token,
    })
        .then(res => {

          const posts2 = res.data.data;
          setPost2(posts2);
        }).catch(err => {
      console.log(err);
    });
  }, []);
  const columns2 = [
    {label: "Tag ID", name: "id" },
    {label: "Tag Name", name:"name" },
    {label:"Type of Tag", name:"type" }
  ];


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
                data={posts}
                columns={columns}
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
            <FormSubmit_ImageUrl
                formName="Add new Image to Training Set"
                formDescription="Using TagID and Image URL from the Feedback, You can add images to AI DataSet."
            />
          </div>
        </Grid>
        </Grid>
      </>
  );
}
