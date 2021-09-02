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
    const [formName, setName] = useState(itemName.FoodName);
    const [formDescription, setDescription] = useState(itemName.FoodDescription);
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

    /**The initial values for the form */
    const formik = useFormik(
        {
            enableReinitialize: true,
            initialValues: {
                ItemName: formName,
                ItemDescription: formDescription,
                ItemTags: formTags
            }
        }
    )
    /*Access form values with formik.values */
    // console.log(formik.values);

    const handleClear = () => {
        setName(" ");
        setDescription(" ");
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
                setImg(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const validateForm = Yup.object().shape({
        ItemName: Yup.string().min(1, '*').required('*Required'),
        ItemDescription: Yup.string().required('Required'),
        ItemTags: Yup.string().email('Invalid email').required('Required'),
    });

    return (
        <div className={classes.addItemContainer}>
            <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.legendElementText}
            >
                <p style={{ fontSize: 18 }}>   Add an item to the database:</p>
            </Typography>
            {/* <p className={classes.fontSizeMedium}></p> */}
            <div>
                <Formik
                    onSubmit={() => (console.log("submitted " + formik.values.ItemName + " " + formik.values.ItemTags))}
                    initialValues={formik.values}
                    validationSchema={validateForm}
                >
                    {/** The moderate pairings form to submit */}
                    {({ errors, touched, values }) => (
                        <Form>
                            <div className={classes.formElements}>
                                <div className={classes.PreviewContainer}>
                                    <div className={classes.PreviewPiece}><label htmlFor="file-input"><Typography
                                        color="text"
                                        colorBrightness="secondary"
                                        className={classes.legendElementText}
                                    >
                                        <p style={{ fontSize: 15 }}>Upload an image</p></Typography></label></div>
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
                                <label htmlFor="ItemName" className={classes.formLabel}><Typography
                                    color="text"
                                    colorBrightness="secondary"
                                    className={classes.legendElementText}
                                >
                                    <p style={{ fontSize: 18, marginTop: -15 }}><div style={{ float: "left" }}>Name</div><div style={{ float: "left" }}> {errors.ItemName || !touched.ItemName ? (
                                        <div style={{ color: "red" }}>*</div>
                                    ) : null}</div></p>

                                </Typography>
                                </label>
                                <input id="ItemName" name="ItemName" className={classes.textField} onChange={formik.handleChange} value={formik.values.ItemName} />

                            </div>
                            <div className={classes.formElements}>
                                <label htmlFor="ItemDescription" className={classes.formLabel}> <Typography
                                    color="text"
                                    colorBrightness="secondary"
                                    className={classes.legendElementText}
                                >
                                    <p style={{ fontSize: 18, marginTop: 0 }}>Description</p>
                                </Typography></label>
                                <input id="ItemDescription" name="ItemDescription" className={classes.textField} onChange={formik.handleChange} value={formik.values.ItemDescription} />
                            </div>
                            <div className={classes.formElements}>
                                <label htmlFor="Tags" className={classes.formLabel}><Typography
                                    color="text"
                                    colorBrightness="secondary"
                                    className={classes.legendElementText}
                                >
                                    <p style={{ fontSize: 18, marginTop: 0 }}>Tags</p>
                                </Typography></label>
                                <input id="ItemTags" name="ItemTags" className={classes.textField} onChange={formik.handleChange} value={formik.values.ItemTags} />
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
