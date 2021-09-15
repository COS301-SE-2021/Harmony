import React, { useState, useEffect, useRef } from 'react';
import { Grid } from "@material-ui/core";
import useStyles from "./styles";
import TextField from '@material-ui/core/TextField'
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Button from '@material-ui/core/Button';
import { Typography } from "../../components/Wrappers";
import Geocode from "react-geocode";
import PayPal from '../dashboard/components/Table/PayPal';
import { GrPaypal } from "react-icons/gr";
import * as yup from 'yup';

import {
  Formik, Form, useFormik, Field, validateYupSchema
} from 'formik';

export default function Tables() {
  const classes = useStyles();
  const [logo, setLogo] = useState("http://beepeers.com/assets/images/commerces/default-image.jpg");
  // useEffect(() => {
  const [checkout, setCheckout] = useState(false);

  // }, [logo])
  /**set the api key to use geocode */
  // Geocode.setApiKey("AIzaSyBX7qzFSYnqo28_uZDI3GBRCK7JGkK07L8");
  // Geocode.setLanguage("en");
  // Geocode.setRegion("za");
  // Geocode.setLocationType("ROOFTOP");
  // Get latitude & longitude from address.
  // Geocode.fromAddress("Eiffel Tower").then(
  //   (response) => {
  //     const { lat, lng } = response.results[0].geometry.location;
  //     console.log(lat, lng);
  //   },
  //   (error) => {
  //     console.error(error);
  //   }
  // );
  /**@var fileRef to create a reference to the file input to be able to clear it */
  const logoFileRef = useRef();
  const submitButtonRef = useRef();

  const supportedFormats = ['image/jpg', 'image/jpeg', 'image/png'];
  /**image validation schema */
  let schema = yup.object().shape({
    logo: yup.mixed().test('fileType', "Unsupported File Type", (value) => {
      // supportedFormats.includes(value.type)
      console.log(value)
    })
  });

  /**Handles the image preview */
  const logoImageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        // schema.isValid({ logo: reader.result }).then(alert("image is valid"), setLogo(reader.result));
        setLogo(reader.result)
        // submitButtonRef.current.click()
        // alert(JSON.stringify(logo))
        // console.log(btoa(img))
      }
    }
    if (supportedFormats.includes(e.target.files[0].type)) { reader.readAsDataURL(e.target.files[0]) }
    else {
      alert(e.target.files[0].type + " is not a supported file format.");
      setLogo("http://beepeers.com/assets/images/commerces/default-image.jpg");
    }
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
            <Formik onSubmit={() => console.log("clicked submit")} validationSchema={schema}>
              {({ errors, touched, values, handleChange, resetForm }) => (
                <Form >
                  <div className={classes.PreviewPiece}><label htmlFor="file-input-Logo"></label></div>
                  <div className={classes.PreviewPiece}><img src={logo} className={classes.ImageContainer} /></div>
                  <div className={classes.FileInput}><input type="file" id="file-input-Logo" name="ImageclassNameFood" accept="image/*" ref={logoFileRef} onChange={logoImageHandler} style={{ display: 'none' }} />
                    <Button onClick={() => (logoFileRef.current.click())} className={classes.uploadLogoButton} variant="contained">Upload New Logo</Button>
                    {/* <Button type="submit" className={classes.uploadLogoButton} ref={submitButtonRef} variant="contained">Upload click</Button> */}

                  </div>
                </Form>)}
            </Formik>
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
              View Account Balance
            </Typography>
            <div className={classes.outstandingBalance}>
              <p className={classes.outstandingBalanceWord}>Outstanding Balance</p>
              <Typography size="xxl" weight="bold">
                {mockResponse.outstandingBalance}
              </Typography>
            </div>
            <div className={classes.PayPalContainer}>
              {checkout ? (<PayPal amount={mockResponse.outstandingBalance} />) : (
                <Button className={classes.payNowButton} variant="contained" onClick={() => { setCheckout(true) }}><GrPaypal style={{ marginRight: 10 }} size={20} color="white" />Pay now</Button>
              )}
            </div>
          </Widget>

        </Grid>
      </Grid>
    </>
  );
}