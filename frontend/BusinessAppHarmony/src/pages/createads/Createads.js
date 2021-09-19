import React from "react";
import { Grid } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
import CreateAdForm from "./CreateAdForm";
export default function TypographyPage() {
  var classes = useStyles();

  return (
    <>
      <PageTitle title="Create Advert" />
      <Grid container spacing={1}>
        <CreateAdForm />
      </Grid>
    </>
  );
}
