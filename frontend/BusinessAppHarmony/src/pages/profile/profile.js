import React, { useState, useEffect, useRef } from 'react';
import { Grid, Table, TableRow, TableHead, TableBody, TableCell, } from "@material-ui/core";
import useStyles from "./styles";
import { Auth } from 'aws-amplify';
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import { Typography } from "../../components/Wrappers";
import PayPal from '../dashboard/components/Table/PayPal';
import { GrPaypal } from "react-icons/gr";
import LocationForm from './LocationForm';
import { GrEdit } from "react-icons/gr";
import { FiMinusCircle } from "react-icons/fi";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import {
  Formik, Form
} from 'formik';

export default function ProfilePage() {
  const classes = useStyles();
  /**Default logo */
  const [logo, setLogo] = useState("https://beepeers.com/assets/images/commerces/default-image.jpg");
  /**The checkout button for paypal */
  const [checkout, setCheckout] = useState(false);
  const [data, setData] = useState({ BusinessName: "", OutstandingAmount: 0, Locations: [{ name: "" }, { address: "" }] });
  const [editName, setEditName] = useState(false);

  /**to detect if a child component is changed */
  const [change, detectChange] = useState(true);
  const detectChangeRef = useRef();
  useEffect(() => {
    detectChange(false);
    console.log("change detected");
    /**load profile data */
    fetch("https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/getprofile", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ BID: Auth.user.username })
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
  }, [change])

  useEffect(() => {
    /**load profile data */
    fetch("https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/getprofile", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ BID: Auth.user.username })
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setData(result.UserData);
          setLogo(result.UserData.Logo);
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

  const nameRef = useRef();

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

        fetch("https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/updateuserlogo", {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({ BID: Auth.user.username, Logo: base64result })
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
      setLogo("https://beepeers.com/assets/images/commerces/default-image.jpg");
    }
  }

  const handleRemoveLocation = (name) => {
    console.log(name + " removed")
    fetch("https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/removelocation", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ BID: Auth.user.username, LocationID: "idsf", LocationAddress: name })
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          // setData(result.Data);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
        }
      )
    fetch("https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/getprofile", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ BID: Auth.user.username })
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setData(result.UserData);
          setLogo(result.UserData.Logo)
        },

        (error) => {
        }
      )
  }

  return (
    <>

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
              <div style={{ justifyContent: "space-around", width: "100%" }}>
                <div className={classes.PreviewPiece}><label htmlFor="file-input-Logo"></label></div>
                <div className={classes.PreviewPiece}><img src={logo} className={classes.ImageContainer} /></div>
                <div className={classes.FileInput}><input type="file" id="file-input-Logo" name="ImageclassNameFood" accept="image/*" ref={logoFileRef} onChange={logoImageHandler} style={{ display: 'none' }} />
                  <Button onClick={() => (logoFileRef.current.click())} className={classes.addButtonLogo} variant="contained">Upload New Logo</Button>
                </div>
              </div>
              <br />
              <div style={{ justifyContent: "space-between", display: "flex" }}>
                <div style={{ float: "left" }}>
                  <Typography size="md" weight="bold">
                    Name
                  </Typography>
                </div>
                <div style={{ float: "left", marginRight: 30, marginTop: 5 }}>
                  <GrEdit size={18} onClick={() => { setEditName(!editName) }} />
                </div>
              </div>
              <div style={{ clear: "both" }}></div>
              <Typography size="md" weight="light">
                {data.BusinessName}
              </Typography>
              {
                editName ? (
                  <Formik
                    onSubmit={(values, { resetForm }) => {
                      /**reset then handle submit */
                      resetForm();
                      fetch("https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/updatename", {
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({ BID: "b4", Name: values.Name })
                      })
                        .then(res => res.json())
                        .then(
                          (result) => {
                            console.log(result);
                          },
                        );
                      setEditName(false);
                      detectChange(true);
                    }}
                    initialValues={{
                      Name: "",
                    }}>
                    {({ values, handleChange }) => (
                      <Form>
                        <TextField id="outlined-basic" variant="outlined" name="Name" className={classes.individualTextField} onChange={handleChange} placeholder="New name" value={values.Name} />
                        <Button variant="contained" color="primary" type="submit" className={classes.addButton} onClick={() => console.log("clicked submit")}>
                          Update Name
                        </Button>
                      </Form>
                    )}
                  </Formik>
                ) : null
              }
              <br />
              <Typography size="md" weight="bold">
                Business Registration
              </Typography>
              <Typography size="sm" weight="medium">
                201901000005 (1315525-A)
              </Typography>

            </div>
            <br />
            <br />
            <br />
            <Typography size="md" weight="bold">
              View Account Balance
            </Typography>
            <div className={classes.outstandingBalance}>
              <p className={classes.outstandingBalanceWord}>Outstanding Balance</p>
              <Typography size="xxl" weight="bold">
                R {data.OutstandingAmount}
              </Typography>
            </div>
            <div className={classes.PayPalContainer}>
              {checkout ? (<PayPal amount={data.OutstandingAmount} reference={detectChangeRef} />) : (
                <Button className={classes.payNowButton} variant="contained" onClick={() => { setCheckout(true) }}><GrPaypal style={{ marginRight: 10 }} size={20} color="white" />Pay now</Button>
              )}
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
            <LocationForm reference={detectChangeRef} />
            <Button style={{ display: 'none' }} onClick={() => detectChange(true)} ref={detectChangeRef} />
            <Table className="mb-0">
              <TableHead>
                <TableRow className={classes.tableRowHeader}>
                  <TableCell className={classes.tableCell}>NAME</TableCell>
                  <TableCell className={classes.tableCell}>ADDRESS</TableCell>
                  <TableCell className={classes.tableCell}>REMOVE</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {data.Locations.map((item) => (

                  <TableRow key={item.Address}>
                    <TableCell className="pl-3 fw-normal">{item.Name}</TableCell>
                    <TableCell>{item.Address}</TableCell>
                    <TableCell><FiMinusCircle style={{ width: 25, height: 25, marginLeft: 20, marginRight: 20 }} onClick={() => (handleRemoveLocation(item.Address))} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Widget>

        </Grid>
        {/* <Grid item xs={4}>
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
                R {data.OutstandingAmount}
              </Typography>
            </div>
            <div className={classes.PayPalContainer}>
              {checkout ? (<PayPal amount={data.OutstandingAmount} reference={detectChangeRef} />) : (
                <Button className={classes.payNowButton} variant="contained" onClick={() => { setCheckout(true) }}><GrPaypal style={{ marginRight: 10 }} size={20} color="white" />Pay now</Button>
              )}
            </div>
          </Widget>
        </Grid> */}
      </Grid>
    </>
  );
}
