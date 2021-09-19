import React, { useState, useEffect, useRef } from 'react';
import { Grid, Table, TableRow, TableHead, TableBody, TableCell, } from "@material-ui/core";
import useStyles from "./styles";
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Button from '@material-ui/core/Button';
import { Typography } from "../../components/Wrappers";
import PayPal from '../dashboard/components/Table/PayPal';
import { GrPaypal } from "react-icons/gr";
import LocationForm from './LocationForm';
import TrendingStats from './trendingStats';
export default function Tables() {
  const classes = useStyles();
  /**Default logo */
  const [logo, setLogo] = useState("http://beepeers.com/assets/images/commerces/default-image.jpg");
  const [checkout, setCheckout] = useState(false);
  const [data, setData] = useState({ OutstandingAmount: 0, Locations: [{ name: "" }, { address: "" }] });

  useEffect(() => {
    /**load profile data */
    fetch("https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/getprofile", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ BID: "b4" })
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setData(result.UserData);
          setLogo(result.UserData.Logo)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
        }
      )
  }, [])

  /**@var fileRef to create a reference to the file input to be able to clear it */
  const logoFileRef = useRef();

  /**The array of the sopported extensions for the image */
  const supportedFormats = ['image/jpg', 'image/jpeg', 'image/png'];

  /**Handles the image preview */
  const logoImageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setLogo(reader.result)
        var base64result = reader.result.split(',')[1];
        console.log(base64result);
        // fetch("https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/updateuserlogo", { BID: "b1", Logo: btoa(reader.result) })
        fetch("https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/updateuserlogo", {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({ BID: "b4", Logo: base64result })
        })
          .then(res => res.json())
          .then(
            (result) => {
              console.log(result);
              setData(result.Data);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            }
          )
      }
    }
    if (supportedFormats.includes(e.target.files[0].type)) { reader.readAsDataURL(e.target.files[0]) }
    else {
      alert(e.target.files[0].type + " is not a supported file format.");
      setLogo("http://beepeers.com/assets/images/commerces/default-image.jpg");
    }
  }


  return (
    <>
      <PageTitle title="Profile" />
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Widget
            disableWidgetMenu
            bodyClass={classes.tableWidget}
          >
            <Typography size="md" weight="bold">
              Profile Settings
            </Typography>
            <br />
            <div className={classes.center}>
              <div className={classes.PreviewPiece}><label htmlFor="file-input-Logo"></label></div>
              <div className={classes.PreviewPiece}><img src={logo} className={classes.ImageContainer} /></div>
              <div className={classes.FileInput}><input type="file" id="file-input-Logo" name="ImageclassNameFood" accept="image/*" ref={logoFileRef} onChange={logoImageHandler} style={{ display: 'none' }} />
                <Button onClick={() => (logoFileRef.current.click())} className={classes.uploadLogoButton} variant="contained">Upload New Logo</Button>
              </div>
              <br />
              <Typography size="md" weight="bold">
                Name
              </Typography>
              <Typography size="md" weight="light">
                Laughing Panda
              </Typography>
              <br />
              <Typography size="md" weight="bold">
                Business Registration
              </Typography>
              <Typography size="sm" weight="medium">
                201901000005 (1315525-A)
              </Typography>

            </div>
          </Widget>
        </Grid>

        <Grid item xs={6}>
          <Widget
            disableWidgetMenu
            bodyClass={classes.tableWidget}
          >
            <Typography size="md" weight="bold">
              Locations
            </Typography>
            <LocationForm />
            <Table className="mb-0">
              <TableHead>
                <TableRow className={classes.tableRowHeader}>
                  <TableCell className={classes.tableCell}>NAME</TableCell>
                  <TableCell className={classes.tableCell}>ADDRESS</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {data.Locations.map(({ Name, Address }) => (

                  <TableRow key={Address}>
                    <TableCell className="pl-3 fw-normal">{Name}</TableCell>
                    <TableCell>{Address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
                {data.OutstandingAmount}
              </Typography>
            </div>
            <div className={classes.PayPalContainer}>
              {checkout ? (<PayPal amount={data.OutstandingAmount} />) : (
                <Button className={classes.payNowButton} variant="contained" onClick={() => { setCheckout(true) }}><GrPaypal style={{ marginRight: 10 }} size={20} color="white" />Pay now</Button>
              )}
            </div>
          </Widget>
        </Grid>
        <TrendingStats />
      </Grid>
    </>
  );
}
