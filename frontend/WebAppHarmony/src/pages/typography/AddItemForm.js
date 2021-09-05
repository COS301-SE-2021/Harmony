import React, { useState, useEffect, useRef } from 'react';
import {
    Formik, Form, useFormik, Field
} from 'formik';
// classNames
import useStyles from "./styles";
import * as Yup from 'yup';
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import { Typography } from "../../components/Wrappers";

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Button from '@material-ui/core/Button';

function AddItemForm(itemName, itemDescription, itemTags, ...props) {
    /**The name, description and tags for the form */
    const [formName, setName] = useState("");
    const [formDescription, setDescription] = useState("");
    const [formTags, setTags] = useState("");
    const [FoodOrDrink, setFoodOrDrink] = React.useState('none');
    const [img, setImg] = useState("http://beepeers.com/assets/images/commerces/default-image.jpg");
    var classes = useStyles();

    /**@var used to create a reference to the file input to be able to clear it */
    const fileRef = useRef();

    /**Sets the toggle value to whether the added item is a food or drink */
    const HandleToggle = (event, newValue) => {
        setFoodOrDrink(newValue);
    };
    /**@function useEffect trigger
     * @summary this trigger is fired when the item is updated by clicking a new item and updating the initial values
     */
    useEffect(() => {
        // Update the document title using the browser API
        setName(itemName.FoodName);
        setDescription(itemName.FoodDescription);
    }, [itemName]);

    const handleClear = () => {
        setName("");
        setDescription("");
        setImg("http://beepeers.com/assets/images/commerces/default-image.jpg");
        fileRef.current.value = "";
        setFoodOrDrink('none');
        setTags("");
    }

    /**Handles the image preview */
    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImg(reader.result);
                // console.log(btoa(img))
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    /** Submits the form to the database */
    const handleSubmit = (vals) => {
        console.log("submitted handle " + JSON.stringify(vals))
        var request = {
            "ItemName": vals.ItemName,
            "ItemDescription": vals.ItemDescription,
            "ItemTags": vals.ItemTags,
            "FoodOrDrink": FoodOrDrink,
            "Image": btoa(img)
        }
        // console.log("request to submit " + JSON.stringify(request))
        fetch('https://w3lfp6r6f7.execute-api.eu-west-1.amazonaws.com/dev/additem', request)
            .then(response => response.json())
            .then(data => console.log(data))
    }

    return (
        <div className={classes.addItemContainer}>
            <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.legendElementText}
                size={18}
            >
                Add an item to the database:
            </Typography>
            <br />
            {/* <p className={classes.fontSizeMedium}></p> */}
            <div>
                <Formik
                    // initialValues={formik.values}
                    initialValues={{
                        ItemName: formName,
                        ItemDescription: formDescription,
                        ItemTags: formTags
                    }}
                    validationSchema={Yup.object().shape({
                        ItemName: Yup.string().required('*'),
                        ItemDescription: Yup.string().required('*'),
                        ItemTags: Yup.string().required('*'),
                    })}
                    // onSubmit={(values) => handleSubmit(values)}
                    onSubmit={(values, { resetForm }) => {
                        /**reset then handle submit */
                        resetForm();
                        handleSubmit(values);
                    }}
                    enableReinitialize={true}
                >
                    {/** The moderate pairings form to submit */}
                    {({ errors, touched, values, handleChange }) => (
                        <Form>
                            <div className={classes.formElements}>
                                <div className={classes.PreviewContainer}>
                                    <div className={classes.PreviewPiece}><label htmlFor="file-input"><Typography
                                        color="text"
                                        colorBrightness="secondary"
                                        className={classes.legendElementText}
                                        size={15}
                                    >Upload an image</Typography></label></div>
                                    <div className={classes.PreviewPiece}><img src={img} className={classes.ImageContainer} /></div>
                                    <div className={classes.FileInput}><input type="file" id="file-input" name="ImageclassName" accept="image/*" ref={fileRef} onChange={imageHandler} /></div>
                                </div>
                                <ToggleButtonGroup
                                    value={FoodOrDrink}
                                    exclusive
                                    onChange={HandleToggle}
                                    className={classes.Toggle}
                                >
                                    <ToggleButton value="Food" >
                                        Food
                                    </ToggleButton>
                                    <ToggleButton value="Drink" >
                                        Drink
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>

                            <div className={classes.formElements}>
                                <label htmlFor="ItemName" className={classes.formLabel}>
                                    <div className={classes.floatLeft}>
                                        <p className={classes.errorDiv}>Name</p>
                                    </div>
                                    <div className={classes.floatLeft}>
                                        {(errors.ItemName && touched.ItemName) ? (
                                            <div className={classes.errorStar}>{errors.ItemName}</div>
                                        ) : null}
                                    </div>
                                </label>
                                {/* <Field id="ItemName" name="ItemName" className={classes.textField} onChange={formik.handleChange} value={formik.values.ItemName} /> */}
                                <Field id="ItemName" name="ItemName" className={classes.textField} onChange={handleChange} value={values.ItemName} />
                                {/* {
                                    console.log("158 " + JSON.stringify(formik.values))
                                } */}
                            </div>
                            <div className={classes.formElements}>
                                <label htmlFor="ItemDescription" className={classes.formLabel}>
                                    <div className={classes.floatLeft}><p className={classes.errorDiv}>Description</p> </div><div className={classes.floatLeft}>
                                        {errors.ItemDescription && touched.ItemDescription ? (
                                            <div className={classes.errorStar}>*</div>
                                        ) : null}</div>
                                </label>
                                <Field id="ItemDescription" name="ItemDescription" className={classes.textField} onChange={handleChange} value={values.ItemDescription} />
                            </div>
                            <div className={classes.formElements}>
                                <label htmlFor="ItemTags" className={classes.formLabel}>
                                    <div className={classes.floatLeft}><p className={classes.errorDiv}>Tags</p> </div><div className={classes.floatLeft}>
                                        {errors.ItemTags && touched.ItemTags ? (
                                            <div className={classes.errorStar}>*</div>
                                        ) : null}</div>
                                </label>
                                <Field id="ItemTags" name="ItemTags" className={classes.textField} onChange={handleChange} value={values.ItemTags} />
                            </div>

                            <div>
                                <Button onClick={() => handleClear()} className={classes.clearButton} variant="contained">Clear</Button>
                                <Button variant="contained" color="primary" type="submit" className={classes.addButton} onClick={() => console.log("clicked submit")}>
                                    Add to database
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    );
}

export default AddItemForm;
