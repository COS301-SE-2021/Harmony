import PageTitle from "../../components/PageTitle";
import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import {Button, Grid} from "@material-ui/core";
import  { makeStyles } from "@material-ui/core";
import {FormSubmit_ImageUrl} from "../../components/Forms/FormSubmit_ImageUrl";
import {FormSubmit_NewTag} from "../../components/Forms/FormSubmit_NewTag";
import {FormSubmit_Iterations} from "../../components/Forms/FormSubmit_Iterations";
import {FormSubmit_PublishIterations} from "../../components/Forms/FormSubmit_PublishIterations";


const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

// function refreshPage() {
//   window.location.reload(true);
// }
function callApi() {
  fetch('https://7q0027151j.execute-api.eu-west-1.amazonaws.com/dev/train', { method: 'GET' })
      .then(data => data.json()) // Parsing the data into a JavaScript object
      .then(alert("A new Iteration has Successfully been Trained"))// Displaying the stringified data in an alert popup
}
export default function DataTable() {
  const classes = useStyles()
  const [posts, setPost] = useState([]);
  const [posts1, setPost1] = useState([]);


  let signal = axios.CancelToken.source();


  // Get Iterations Table
  useEffect(() => {
    let isSubscribed = true;
    axios.get(`https://7q0027151j.execute-api.eu-west-1.amazonaws.com/dev/getiterations`, {
      cancelToken: signal.token,
    })
        .then(res => {
          const posts1 = res.data.data;
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
    {label: "Iteration Name", name: "name" },
    {label: "Iteration ID", name: "id" },
    {label:"Status of Iteration", name:"status" },
    {label:"Date of Training", name:"trainedAt" },
    {label: "Published Name", name:"publishName" }
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

        <PageTitle title="Train AI"
                   button={<Button
                       variant="contained"
                       size="large"
                       color="secondary"
                       onClick={callApi}>
                     Train New Iteration
        </Button>}
        />
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MUIDataTable
                title={"Iterations"}
                data={posts1}
                columns={columns1}
                options={options}
            />


          </Grid>
          <Grid item xs={6}>
            <div className="App">
              <FormSubmit_PublishIterations
                  formName="Publish Iteration"
                  formDescription="The iteration will be available to be used for prediction"
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="App">
              <FormSubmit_Iterations
                  formName="Unpublish Iteration"
                  formDescription="The iteration will no longer be available for prediction"
              />
            </div>
          </Grid>


        </Grid>
      </>
  );
}
