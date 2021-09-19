import React, { useState, useEffect, useRef } from 'react';
import useStyles from "./styles";


import TextField from '@material-ui/core/TextField'
// components
import Button from '@material-ui/core/Button';
import Geocode from "react-geocode";
import * as Yup from 'yup';
import {
    Formik, Form
} from 'formik';

const MY_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export default function LocationForm() {
    const classes = useStyles();
    /**import the api key */
    const handleLocationUpdate = (values) => {
        console.log(values.LocationAddress);

        console.log("key is " + MY_KEY);
        /**set the api key to use geocode */
        Geocode.setApiKey(MY_KEY);
        Geocode.setLanguage("en");
        Geocode.setRegion("za");
        Geocode.setLocationType("ROOFTOP");
        // Get latitude & longitude from address.
        Geocode.fromAddress(values.LocationAddress).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
                fetch("https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/addnewlocations", {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({ BID: "b4", lat: lat, lng: lng, "LocationName": values.LocationName, "Address": values.LocationAddress })
                })
                    .then(res => res.json())
                    .then(
                        (result) => {
                            console.log(result);
                        },
                        // Note: it's important to handle errors here
                        // instead of a catch() block so that we don't swallow
                        // exceptions from actual bugs in components.
                        (error) => {
                        }
                    )
            },
            (error) => {
                console.error(error);
                alert("Location " + values.LocationName + " was not found.")
            }
        );
    }

    return (

        <div className={classes.formElementsImageContainer}>
            <Formik
                initialValues={{
                    LocationName: "",
                    LocationAddress: ""
                }}
                validationSchema={Yup.object().shape({
                    LocationName: Yup.string().required('*'),
                    LocationAddress: Yup.string().required('*'),
                })}
                onSubmit={(values, { resetForm }) => { resetForm(); handleLocationUpdate(values) }}
            >
                {/** The moderate pairings form to submit */}
                {({ errors, touched, values, handleChange, resetForm }) => (
                    <Form >
                        <div className={classes.marginAuto}>
                            <div className={classes.formContainer}>
                                <label htmlFor="LocationName" className={classes.formLabel}>
                                    <div className={classes.floatLeft}>
                                        <p className={classes.errorDiv}>Name</p>
                                    </div>
                                    <div className={classes.floatLeft}>
                                        {(errors.LocationName && touched.LocationName) ? (
                                            <div className={classes.errorStar}>*</div>
                                        ) : null}
                                    </div>
                                </label>
                                <TextField id="outlined-basic" variant="outlined" name="LocationName" className={classes.individualTextField} onChange={handleChange} value={values.LocationName} />
                            </div>
                            <div className={classes.formContainer}>
                                <label htmlFor="LocationAddress" className={classes.formLabel}>
                                    <div className={classes.floatLeft}>
                                        <p className={classes.errorDiv}>Address</p>
                                    </div>
                                    <div className={classes.floatLeft}>
                                        {(errors.LocationAddress && touched.LocationAddress) ? (
                                            <div className={classes.errorStar}>*</div>
                                        ) : null}
                                    </div>
                                </label>
                                <TextField id="outlined-basic" variant="outlined" name="LocationAddress" className={classes.individualTextField} onChange={handleChange} value={values.LocationAddress} />
                            </div>
                        </div>
                        <Button type="Submit" className={classes.addLocationButton} > Add New Location</Button>

                    </Form>
                )}
            </Formik>
        </div>

    );
}
