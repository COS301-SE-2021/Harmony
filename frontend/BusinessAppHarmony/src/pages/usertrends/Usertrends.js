import React from 'react';
import { Grid } from "@material-ui/core";
// components
import TrendingStats from './trendingStats';

export default function Tables() {


  return (
    <>

      <Grid container spacing={4}>

        <TrendingStats />
      </Grid>
    </>
  );
}
