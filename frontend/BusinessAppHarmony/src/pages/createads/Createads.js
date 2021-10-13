import React from 'react';
import { Grid } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
import CreateAdForm from "./CreateAdForm";
import Widget from "../../components/Widget";
import { Typography } from "../../components/Wrappers";

export default function TypographyPage() {
  var classes = useStyles();
  /**The name, description and tags for the form */

  return (
    <>
      <div style={{ marginLeft: 26 }}>
        <Grid item xs={12}>
          <Widget
            disableWidgetMenu
          >
            <Typography size="xl" weight="bold">
              Create Advert
            </Typography>
            <Typography size="md" weight="light">
              We use a very specific cost calculation in order to determine the perfect price point for adverts.
              <br /><br />Advert costs are calculated as follows:<br />
            </Typography>
            <Typography size="md" weight="light">
              ( R2 x (Number of Locations) x (Time Period in days ) )+ (Radius in kms)
            </Typography>
            <br />
            <Typography size="xs" weight="light">
              For example, if you were to make an advert of a burger and coke in 3 of your locations for
              1 week with a radius of 20 kms from each location.
              <br />You would pay:<br />
              ( R2 x 3 Locations x 7 days ) + 20 Kilometers = R62
            </Typography>
          </Widget>
        </Grid>
      </div>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <CreateAdForm />
        </Grid>
      </Grid>
    </>
  );
}
