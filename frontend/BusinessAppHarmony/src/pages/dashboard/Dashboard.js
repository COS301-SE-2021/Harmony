import React, { useState } from "react";
import {
  Grid,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
// styles
import useStyles from "./styles";
// components
import mock from "./mock";
import PageTitle from "../../components/PageTitle";
import Table from "./components/Table/Table";

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();


  return (
    <>
      <PageTitle title="Statement" />
      <Grid container spacing={4}>
        <Table data={mock.table} />
      </Grid>
    </>
  );
}

// #######################################################################
