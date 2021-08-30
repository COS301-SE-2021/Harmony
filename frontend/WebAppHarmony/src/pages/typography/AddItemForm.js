import React, { useState, useEffect, useRef } from 'react';
import {
    Formik, Form, useFormik
} from 'formik';
// classNames
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

function AddItemForm(itemName, itemDescription, itemTags, ...props) {
    /**The name, description and tags for the form */
    const [formName, setName] = useState(itemName.itemName);
    const [formDescription, setDescription] = useState(itemName.itemDescription);
    const [formTags, setTags] = useState(itemName.itemTags);
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
        setName(itemName.itemName);
        setDescription(itemName.itemDescription);
        setTags(itemName.itemTags);
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
        setTags(" ");
        setImg("http://beepeers.com/assets/images/commerces/default-image.jpg");
        fileRef.current.value = "";
        setFoodOrDrink('none');
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
    return (
        <div className={classes.addItemContainer}>
            <p className={classes.fontSizeMedium}>Add an item to the database:</p>
            <div>
                <Formik
                    onSubmit={() => (console.log("submitted"))}
                    initialValues={formik.values}
                >
                    {/** The moderate pairings form to submit */}
                    {({ values }) => (
                        <Form>
                            <div className={classes.formElements}>
                                <div className={classes.PreviewContainer}>
                                    <div className={classes.PreviewPiece}><label htmlFor="file-input">Upload an image</label></div>
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
                                <label htmlFor="ItemName" className={classes.formLabel}> Name</label>
                                <input id="ItemName" name="ItemName" className={classes.textField} onChange={formik.handleChange} value={formik.values.ItemName} />
                            </div>
                            <div className={classes.formElements}>
                                <label htmlFor="ItemDescription" className={classes.formLabel}> Description</label>
                                <input id="ItemDescription" name="ItemDescription" className={classes.textField} onChange={formik.handleChange} value={formik.values.ItemDescription} />
                            </div>
                            <div className={classes.formElements}>
                                <label htmlFor="Tags" className={classes.formLabel}> Tags</label>
                                <input id="Tags" name="ItemTags" className={classes.textField} onChange={formik.handleChange} value={formik.values.ItemTags} />
                            </div>

                            <div>
                                <button onClick={() => handleClear()} className={classes.clearButton}><p className={classes.fontSizeMedium}>Clear</p></button>
                                <button type="submit" onClick={() => console.log("clicked submit")} className={classes.addButton}><p className={classes.fontSizeMedium}>Add to Database</p></button>
                            </div>
                        </Form>
                    )}
                </Formik>
                {/* <button onClick={() => handleClear()} className={classes.button}><p className={classes.fontSizeMedium}>Clear</p></button> */}
            </div>
        </div >
    );
}

export default AddItemForm;
