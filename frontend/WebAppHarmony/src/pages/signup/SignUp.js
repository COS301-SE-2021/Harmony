import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Form from './Form';
import classnames from "classnames";
import { Auth } from 'aws-amplify';

// styles
import useStyles from "./styles";
import {useHistory} from "react-router-dom"
// logo
import logo from "./logo.svg";


// context

function ResetPass(props) {
  var classes = useStyles();


  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Harmony Admin</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>


            <React.Fragment>
                <Form />
            </React.Fragment>
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(ResetPass);
