import React, { useState, useEffect, useRef } from 'react';
import { Grid } from "@material-ui/core";
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";
import Button from '@material-ui/core/Button';

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
  return (
    <>
      <PageTitle title="Profile" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget
            disableWidgetMenu
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <div className={classes.PreviewPiece}><label htmlFor="file-input-Logo"></label></div>
            <div className={classes.PreviewPiece}><img src={logo} className={classes.ImageContainer} /></div>
            <div className={classes.FileInput}><input type="file" id="file-input-Logo" name="ImageclassNameFood" accept="image/*" ref={logoFileRef} onChange={logoImageHandler} style={{ display: 'none' }} />
              <Button onClick={() => (logoFileRef.current.click())} className={classes.uploadLogoButton} variant="contained">Upload Image</Button>
            </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
