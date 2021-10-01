import React, { useState } from 'react';
import useStyles from "./styles";
import TextField from '@material-ui/core/TextField'
// components
import Button from '@material-ui/core/Button';
import Geocode from "react-geocode";
import * as Yup from 'yup';
import {
    Formik, Form
} from 'formik';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
const MY_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export default function LocationForm() {
    const classes = useStyles();
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    /**import the api key */
    const handleLocationUpdate = (values) => {
        console.log(values.LocationName);
        console.log(address);
        fetch("https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/addnewlocations", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ BID: "b4", lat: coordinates.lat, lng: coordinates.lng, "LocationName": values.LocationName, "Address": values.address })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    alert("Location " + values.LocationName + " was added successfully.")
                    setAddress("");
                    setCoordinates({ lat: null, lng: null });
                },

                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                }
            )
        // console.log("key is " + MY_KEY);
        // /**set the api key to use geocode */
        // Geocode.setLanguage("en");
        // Geocode.setRegion("za");
        // Geocode.setLocationType("ROOFTOP");
        // // Get latitude & longitude from address.
        // Geocode.fromAddress(values.LocationAddress).then(
        //     (response) => {
        //         const { lat, lng } = response.results[0].geometry.location;
        //         console.log(lat, lng);
        //         fetch("https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/addnewlocations", {
        //             headers: {
        //                 'Accept': 'application/json',
        //                 'Content-Type': 'application/json'
        //             },
        //             method: "POST",
        //             body: JSON.stringify({ BID: "b4", lat: lat, lng: lng, "LocationName": values.LocationName, "Address": values.LocationAddress })
        //         })
        //             .then(res => res.json())
        //             .then(
        //                 (result) => {
        //                     console.log(result);
        //                     alert("Location " + values.LocationName + " was added successfully.")
        //                 },

        //                 // Note: it's important to handle errors here
        //                 // instead of a catch() block so that we don't swallow
        //                 // exceptions from actual bugs in components.
        //                 (error) => {
        //                 }
        //             )
        //     },
        //     (error) => {
        //         console.error(error);
        //         alert("Location " + values.LocationName + " was not found.")
        //     }
        // );
    }
    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setCoordinates(latLng);
        setAddress(value);
    }
    return (

        <div className={classes.formElementsImageContainer}>
            {/* <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <p>Latitude:{coordinates.lat}</p>
                        <p>Longitude:{coordinates.lng}</p>
                        <p> Address: {address}</p>
                        <input  {...getInputProps({ placeholder: "Street Address" })} />
                        <div>
                            {loading ? <div>... loading</div> : null}

                            {suggestions.map((suggestion) => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#81b5c2" : "#fff",
                                    color: suggestion.active ? "#fff" : "#4A4A4A",
                                };
                                return <div {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>;
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete> */}
            <Formik
                initialValues={{
                    LocationName: "",
                    LocationAddress: ""
                }}
                validationSchema={Yup.object().shape({
                    LocationName: Yup.string().required('*'),
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
                                        <p className={classes.errorDiv}>Street Address</p>
                                    </div>
                                    <div className={classes.floatLeft}>
                                        {/* {(errors.LocationAddress && touched.LocationAddress) ? (
                                            <div className={classes.errorStar}>*</div>
                                        ) : null} */}
                                        {(coordinates.lat === null && touched.LocationAddress) ? (
                                            <div className={classes.errorStar}>*</div>
                                        ) : null}
                                    </div>
                                </label>
                                <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div style={{ width: '100%' }}>
                                            <TextField id="outlined-basic" variant="outlined" name="LocationAddress" className={classes.individualTextField} {...getInputProps({ placeholder: "" })} />

                                            <div >
                                                {loading ? <div>... loading</div> : null}

                                                {suggestions.map((suggestion) => {
                                                    const style = {
                                                        backgroundColor: suggestion.active ? "#81b5c2" : "#fff",
                                                        color: suggestion.active ? "#fff" : "#4A4A4A",
                                                        borderWidth: 2,
                                                        borderColor: "#4A4A4A"
                                                    };
                                                    return <div {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>;
                                                })}
                                            </div>

                                        </div>
                                    )}
                                </PlacesAutocomplete>

                                {/* <TextField id="outlined-basic" variant="outlined" name="LocationAddress" className={classes.individualTextField} onChange={handleChange} value={values.LocationAddress} /> */}
                            </div>
                            <div className={classes.CoordinatesContainer}>
                                <p className={classes.errorDiv}>Latitude:<div style={{ float: 'right' }}>{coordinates.lat}</div></p>
                                <p className={classes.errorDiv}>Longitude:<div style={{ float: 'right' }}>{coordinates.lng}</div></p>
                            </div>
                        </div>
                        <Button type="Submit" className={classes.addLocationButton} > Add New Location</Button>

                    </Form>
                )}
            </Formik>
        </div>

    );
}
