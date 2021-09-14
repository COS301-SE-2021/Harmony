import React, { useState, useEffect, useRef } from 'react';
import { Grid } from "@material-ui/core";
import useStyles from "./styles";
import TextField from '@material-ui/core/TextField'
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";
import Button from '@material-ui/core/Button';
import { Typography } from "../../components/Wrappers";
export default function Tables() {
  const classes = useStyles();
  const [logo, setLogo] = useState("http://beepeers.com/assets/images/commerces/default-image.jpg");

  /**@var fileRef to create a reference to the file input to be able to clear it */
  const logoFileRef = useRef();

  /**Handles the image preview */
  const logoImageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setLogo(reader.result);
        // console.log(btoa(img))
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const handleLocationUpdate = () => {

  }
  const mockResponse = {
    statusCode: 200,
    logo: "base 64 format",
    locations: [{ name: "Durban North", address: "34 Ilala Drive" },
    { name: "Pretoria East", address: "107 Garsfontein Road" },
    { name: "Westiville", address: "37 Jack Martins Drive" }
    ],
    outstandingBalance: 187.25
  }
  return (
    <>
      <PageTitle title="Profile" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget
            disableWidgetMenu
            bodyClass={classes.tableWidget}
          >
            <Typography size="md" weight="bold">
              Profile Settings
            </Typography>
            <br />
            <div className={classes.PreviewPiece}><label htmlFor="file-input-Logo"></label></div>
            <div className={classes.PreviewPiece}><img src={logo} className={classes.ImageContainer} /></div>
            <div className={classes.FileInput}><input type="file" id="file-input-Logo" name="ImageclassNameFood" accept="image/*" ref={logoFileRef} onChange={logoImageHandler} style={{ display: 'none' }} />
              <Button onClick={() => (logoFileRef.current.click())} className={classes.uploadLogoButton} variant="contained">Upload New Logo</Button>
            </div>
          </Widget>
        </Grid>

        <Grid item xs={6}>
          <Widget
            disableWidgetMenu
            bodyClass={classes.tableWidget}
          >
            <Typography size="md" weight="bold">
              Edit Locations
            </Typography>
            <div className={classes.formElementsImageContainer}>
              <label htmlFor="Locations" className={classes.formLabel}>
                <div className={classes.floatLeft}>
                  <p className={classes.errorDiv}>New Location</p>
                </div>

              </label>
              <TextField id="outlined-basic" variant="outlined" name="Locations" className={classes.individualTextField} onChange={handleLocationUpdate} value="" />

            </div>
          </Widget>

        </Grid>
        <Grid item xs={6}>
          <Widget
            disableWidgetMenu
            bodyClass={classes.tableWidget}
          >
            <Typography size="md" weight="bold">
              View Account
            </Typography>
          </Widget>

        </Grid>
      </Grid>
    </>
  );
}
