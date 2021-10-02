import React from "react";
import { Grid } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
export default function AdvertsPage() {
  var classes = useStyles();

  return (
    <>
      <PageTitle title="Advert" />
      <Grid container spacing={1}>

      </Grid>
    </>
  );
}
