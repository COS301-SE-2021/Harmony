import PageTitle from "../../components/PageTitle";
import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import {Grid, Button} from "@material-ui/core";
import  { makeStyles } from "@material-ui/core";
import {FormSubmit_ImageUrl} from "../../components/Forms/FormSubmit_ImageUrl";
import {FormSubmit_NewTag} from "../../components/Forms/FormSubmit_NewTag";
import {FormSubmit_Iterations} from "../../components/Forms/FormSubmit_Iterations";
import { withRouter } from "react-router-dom";
import {useHistory} from "react-router-dom"

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})
//
// function refreshPage() {
//   window.location.reload(true);
// }

export default function DataTable() {
  const classes = useStyles()

    const history = useHistory();
    const handleRoute = () =>{
        history.push('/app/tables');
    }


  const [posts, setPost] = useState([]);
  const [posts1, setPost1] = useState([]);


  let signal = axios.CancelToken.source();

  useEffect(() => {
    let isSubscribed = true;
    axios.get(`https://7q0027151j.execute-api.eu-west-1.amazonaws.com/dev/gettags`, {
      cancelToken: signal.token,
    })
        .then(res => {
          const posts = res.data.data;
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
    {label: "Tag ID", name: "id" },
    {label: "Tag Name", name:"name" },
    {label:"Type of Tag", name:"type" },
    {label:"Image count", name:"imageCount" }
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
        <PageTitle title="Add to AI"
                   // button={<Button
                   //     variant="contained"
                   //     size="large"
                   //     color="secondary"
                   //     onClick={handleRoute}>
                   //   Refresh
                   // </Button>}
        />
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MUIDataTable
                title={"Food Tags"}
                data={posts}
                columns={columns}
                options={options}
            />
          </Grid>

        <Grid item xs={6}>
          <div className="App">
            <FormSubmit_NewTag
                formName="Create New Tag"
                formDescription="Enter new Tag name and Tag Type"
            />
          </div>
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
