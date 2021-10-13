import React, { useState, useEffect, useRef } from 'react';
import { Grid, Table, TableRow, TableHead, TableBody, TableCell, } from "@material-ui/core";
import useStyles from "./styles";
// components
import TrendingStats from './trendingStats';
import { FiMinusCircle } from "react-icons/fi";
import Button from '@material-ui/core/Button';

export default function Tables() {
  const classes = useStyles();


  return (
    <>

      <Grid container spacing={4}>

        <TrendingStats />
      </Grid>
    </>
  );
}
