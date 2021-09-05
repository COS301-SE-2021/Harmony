import React from "react";
import { Grid } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import { Typography } from "../../components/Wrappers";
import CreateAdForm from "./CreateAdForm";
export default function TypographyPage() {
  var classes = useStyles();

  return (
    <>
      <PageTitle title="Create Pairing Advert" />
      <Grid container spacing={1}>
        <Grid item xs={12} md={16}>
          <Widget title="" disableWidgetMenu>
            <CreateAdForm />
          </Widget>

        </Grid>
      </Grid>
    </>
  );
}
