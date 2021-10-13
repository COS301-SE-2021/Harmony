import PageTitle from "../../components/PageTitle";
import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import {Grid} from "@material-ui/core";
import { FormSubmit_ImageUrl } from "../../components/Forms/FormSubmit_ImageUrl";
import Widget from "../../components/Widget";
import {Typography} from "../../components/Wrappers";


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
    {label: "Food Tag ID", name: "id" },
    {label: "Food Tag Name", name:"name" },
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
        {/*<PageTitle title="User Feedback on Harmony AI"/>*/}
          <Grid item xs={12}>
              <Widget
                  disableWidgetMenu

              >
                  <Typography size="xl" weight="bold">
                      Add to AI
                  </Typography>

                  <Typography size="md" weight="light">
                    This page recieves Feedback from the Harmony Mobile App on AI performance.
                      From the Table below we can see which have been identfied correctly and incorrectly.
                      We can also use the images from the User to Train our Dataset using the form below.
                  </Typography>
              </Widget>
          </Grid>
          <br/>
          <br/>
        <Grid container spacing={4}>
          <Grid item xs={12}>

            <MUIDataTable
                title={"User Feedback Table from the Harmony Mobile App"}
                data={posts}
                columns={columns}
                options={options}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
        <Grid item xs={6}>
          <MUIDataTable
              title={"AI Food Tags"}
              data={posts2}
              columns={columns2}
              options={options}
          />
        </Grid>
        <Grid item xs={6}>
          <div className="App">
            <FormSubmit_ImageUrl
                formName="Adding to AI Training Set"
                formDescription="
                We need Food Tag ID and a URL of an Image to add to AI Training Set
                Food Tag ID - This is found in the Food Tag table (on the left)
                Image URL - We an Image URL which either a JPG or PNG format
                "
            />
          </div>
        </Grid>
        </Grid>
      </>
  );
}
