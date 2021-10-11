import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import TextField from '@material-ui/core/TextField'
// components
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import {
    Formik, Form
} from 'formik';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import AlertComponent from '../../components/AlertComponent';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

export default function LocationForm(reference, ...props) {
    const classes = useStyles();
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

    /**to toggle the display of the toast */
    const [open, setOpen] = React.useState(false);
    /**use effect to detect the alert opening and will auto close after an amount of time */
    useEffect(() => {
        setTimeout(function () {
            setOpen(false);
        }, 5000);
    }, [open])

    /**import the api key */
    const handleLocationUpdate = (values) => {
        setAddress("");
        setCoordinates({ lat: null, lng: null });
        fetch("https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/addnewlocations", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ BID: "b4", lat: coordinates.lat, lng: coordinates.lng, "LocationName": values.LocationName, "Address": address })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(reference.reference.current.click());
                    setOpen(true);
                },

                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                }
            );
    }
    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        console.log(results[0].formatted_address);
        const latLng = await getLatLng(results[0]);
        setCoordinates(latLng);
        setAddress(results[0].formatted_address);
    }
    return (
        <>
            <div className={classes.formElementsImageContainer}>
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
                        <Form style={{ width: "100%" }}>
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
                                                            // backgroundColor: suggestion.active ? "#CECECE" : "#fff",
                                                            color: suggestion.active ? "#81b5c2" : "#4A4A4A",
                                                            borderWidth: 2,
                                                            borderColor: "#4A4A4A",
                                                        };
                                                        return <div {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>;
                                                    })}
                                                </div>

                                            </div>
                                        )}
                                    </PlacesAutocomplete>
                                </div>
                                <div className={classes.CoordinatesContainer}>
                                    <p className={classes.errorDiv}>Latitude:<div style={{ float: 'right' }}>{coordinates.lat}</div></p>
                                    <p className={classes.errorDiv}>Longitude:<div style={{ float: 'right' }}>{coordinates.lng}</div></p>
                                </div>
                            </div>
                            <div>
                                <Button onClick={() => (resetForm(),
                                    setAddress(""),
                                    setCoordinates({ lat: null, lng: null })
                                )} className={classes.ClearButton} > Clear </Button>
                                <Button type="Submit" className={classes.addLocationButton} > Add New Location</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <Collapse in={open}>
                <Alert onClose={() => { setOpen(false); }}>Location Added Successfully. </Alert>
            </Collapse>
            <br />
        </>
    );
}
