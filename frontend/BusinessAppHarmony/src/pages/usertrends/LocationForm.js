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

export default function LocationForm() {
    const classes = useStyles();

    const handleLocationUpdate = (values) => {
        console.log(values.LocationAddress);
        /**set the api key to use geocode */
        Geocode.setLanguage("en");
        Geocode.setRegion("za");
        Geocode.setLocationType("ROOFTOP");
        // Get latitude & longitude from address.
        Geocode.fromAddress(values.LocationAddress).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
            },
            (error) => {
                console.error(error);
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
