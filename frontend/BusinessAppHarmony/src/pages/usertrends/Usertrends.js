import React, { useState, useEffect, useRef } from 'react';
import { Grid, Table, TableRow, TableHead, TableBody, TableCell, } from "@material-ui/core";
import useStyles from "./styles";
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import { Typography } from "../../components/Wrappers";
import PayPal from '../dashboard/components/Table/PayPal';
import { GrPaypal } from "react-icons/gr";
import LocationForm from './LocationForm';
import TrendingStats from './trendingStats';
import { FiMinusCircle } from "react-icons/fi";
import Button from '@material-ui/core/Button';

export default function Tables() {
  const classes = useStyles();
  /**Default logo */
  const [logo, setLogo] = useState("http://beepeers.com/assets/images/commerces/default-image.jpg");
  /**The checkout button for paypal */
  const [checkout, setCheckout] = useState(false);
  const [data, setData] = useState({ OutstandingAmount: 0, Locations: [{ name: "" }, { address: "" }] });

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
  }, [change])

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

  const handleRemoveLocation = (name) => {
    console.log(name + " removed")
    fetch("https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/removelocation", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ BID: "b4", LocationID: "idsf", LocationAddress: name })
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
      body: JSON.stringify({ BID: "b4" })
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
        <TrendingStats />
      </Grid>
    </>
  );
}
