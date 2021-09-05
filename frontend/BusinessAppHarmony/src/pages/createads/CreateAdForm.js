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

function CreateAdForm(...props) {
    /**The name, description and tags for the form */
    const [formName, setName] = useState("");
    const [formDescription, setDescription] = useState("");
    const [formTags, setTags] = useState("");
    const [FoodOrDrink, setFoodOrDrink] = React.useState('none');
    const [foodImage, setFoodImage] = useState("http://beepeers.com/assets/images/commerces/default-image.jpg");
    const [drinkImage, setDrinkImage] = useState("http://beepeers.com/assets/images/commerces/default-image.jpg");
    var classes = useStyles();

    /**@var used to create a reference to the file input to be able to clear it */
    const foodFileRef = useRef();
    const drinkFileRef = useRef();

    /**Sets the toggle value to whether the added item is a food or drink */
    const HandleToggle = (event, newValue) => {
        setFoodOrDrink(newValue);
    };

    const handleClear = () => {
        setName("");
        setDescription("");
        setFoodImage("http://beepeers.com/assets/images/commerces/default-image.jpg");
        setDrinkImage("http://beepeers.com/assets/images/commerces/default-image.jpg");
        foodFileRef.current.value = "";
        drinkFileRef.current.value = "";
        setFoodOrDrink('none');
        setTags("");
    }

    /**Handles the image preview */
    const FoodImageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setFoodImage(reader.result);
                // console.log(btoa(img))
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    const DrinkImageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setDrinkImage(reader.result);
                // console.log(btoa(img))
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    /** Submits the form to the database */
    const handleSubmit = (vals) => {
        // console.log("submitted handle " + JSON.stringify(vals))
        // var request = {
        //     "ItemName": vals.ItemName,
        //     "ItemDescription": vals.ItemDescription,
        //     "ItemTags": vals.ItemTags,
        //     "FoodOrDrink": FoodOrDrink,
        //     "Image": btoa(img)
        // }
        // // console.log("request to submit " + JSON.stringify(request))
        // fetch('https://w3lfp6r6f7.execute-api.eu-west-1.amazonaws.com/dev/additem', request)
        //     .then(response => response.json())
        //     .then(data => console.log(data))
    }

    return (
        <div className={classes.addItemContainer}>
            <Formik
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
                                <div className={classes.PreviewPiece}><label htmlFor="file-input-Food"><Typography
                                    color="text"
                                    colorBrightness="secondary"
                                    className={classes.legendElementText}
                                    size={15}
                                >Upload an image</Typography></label></div>
                                <div className={classes.PreviewPiece}><img src={foodImage} className={classes.ImageContainer} /></div>
                                <div className={classes.FileInput}><input type="file" id="file-input-Food" name="ImageclassNameFood" accept="image/*" ref={foodFileRef} onChange={FoodImageHandler} /></div>
                            </div>
                            <div className={classes.PreviewContainer}>
                                <div className={classes.PreviewPiece}><label htmlFor="file-input-Drink"><Typography
                                    color="text"
                                    colorBrightness="secondary"
                                    className={classes.legendElementText}
                                    size={15}
                                >Upload an image</Typography></label></div>
                                <div className={classes.PreviewPiece}><img src={drinkImage} className={classes.ImageContainer} /></div>
                                <div className={classes.FileInput}><input type="file" id="file-input-Drink" name="ImageclassNameDrink" accept="image/*" ref={drinkFileRef} onChange={DrinkImageHandler} /></div>
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
        </div >
    );
}

export default CreateAdForm;
