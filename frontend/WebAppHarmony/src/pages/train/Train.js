import PageTitle from "../../components/PageTitle";
import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import {Grid} from "@material-ui/core";
import  { makeStyles } from "@material-ui/core";
import {FormSubmit_ImageUrl} from "../../components/Forms/FormSubmit_ImageUrl";
import {FormSubmit_NewTag} from "../../components/Forms/FormSubmit_NewTag";
import {FormSubmit_Iterations} from "../../components/Forms/FormSubmit_Iterations";


const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

function refreshPage() {
  window.location.reload(false);
}
export default function DataTable() {
  const classes = useStyles()
  const [posts, setPost] = useState([]);
  const [posts1, setPost1] = useState([]);


  let signal = axios.CancelToken.source();


  // Get Iterations Table
  useEffect(() => {
    let isSubscribed = true;
    axios.get(`https://mocki.io/v1/37248929-ce35-49cc-a7d1-b2ae7e4cecb3`, {
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
    {label: "Iteration ID", name: "id" },
    {label: "Published Name", name:"publishName" },
    {label:"Status of Iteration", name:"status" },
    {label:"Date of Training", name:"trainedAt" }
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
        <PageTitle title="Train AI"/>
        <button onClick={refreshPage}>Click to reload!</button>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <MUIDataTable
                title={"Iterations"}
                data={posts1}
                columns={columns1}
                options={options}
            />
          </Grid>

          <Grid item xs={6}>
            <div className="App">
              <FormSubmit_Iterations
                  formName="Iteration Publish or Unpublish"
                  formDescription="Using TagID and Image URL from the Feedback, You can add images to AI DataSet."
              />
            </div>
          </Grid>
        </Grid>
      </>
  );
}
