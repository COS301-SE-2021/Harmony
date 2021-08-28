import React, { useState, useEffect, useRef } from 'react';
import ModerateItemStyling from '../Styling/ModerateItemStyling';
import {
    Formik, Form, useFormik
} from 'formik';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import UniversalStyle from '../Styling/UniversalStyle';

function AddItemForm(itemName, itemDescription, itemTags, ...props) {
    /**The name, description and tags for the form */
    const [formName, setName] = useState(itemName.itemName);
    const [formDescription, setDescription] = useState(itemName.itemDescription);
    const [formTags, setTags] = useState(itemName.itemTags);
    const [FoodOrDrink, setFoodOrDrink] = React.useState('none');
    const [img, setImg] = useState("http://beepeers.com/assets/images/commerces/default-image.jpg");

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
        <div style={ModerateItemStyling.addItemContainer}>
            <p style={UniversalStyle.fontSizeMedium}>Add an item to the database:</p>
            <div>
                <Formik
                    onSubmit={() => (console.log("submitted"))}
                    initialValues={formik.values}
                >
                    {/** The moderate pairings form to submit */}
                    {({ values }) => (
                        <Form>
                            <div style={ModerateItemStyling.formElements}>
                                <div style={ModerateItemStyling.PreviewContainer}>
                                    <div style={ModerateItemStyling.PreviewPiece}><label htmlFor="file-input">Upload an image</label></div>
                                    <div style={ModerateItemStyling.PreviewPiece}><img src={img} style={ModerateItemStyling.ImageContainer} /></div>
                                    <div style={ModerateItemStyling.FileInput}><input type="file" id="file-input" name="ImageStyle" accept="image/*" ref={fileRef} onChange={imageHandler} /></div>
                                </div>
                                <ToggleButtonGroup
                                    value={FoodOrDrink}
                                    exclusive
                                    onChange={HandleToggle}
                                    style={ModerateItemStyling.Toggle}
                                >
                                    <ToggleButton value="Food" >
                                        Food
                                    </ToggleButton>
                                    <ToggleButton value="Drink" >
                                        Drink
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>

                            <div style={ModerateItemStyling.formElements}>
                                <label htmlFor="ItemName" style={ModerateItemStyling.formLabel}> Name</label>
                                <input id="ItemName" name="ItemName" style={ModerateItemStyling.textField} onChange={formik.handleChange} value={formik.values.ItemName} />
                            </div>
                            <div style={ModerateItemStyling.formElements}>
                                <label htmlFor="ItemDescription" style={ModerateItemStyling.formLabel}> Description</label>
                                <input id="ItemDescription" name="ItemDescription" style={ModerateItemStyling.textField} onChange={formik.handleChange} value={formik.values.ItemDescription} />
                            </div>
                            <div style={ModerateItemStyling.formElements}>
                                <label htmlFor="Tags" style={ModerateItemStyling.formLabel}> Tags</label>
                                <input id="Tags" name="ItemTags" style={ModerateItemStyling.textField} onChange={formik.handleChange} value={formik.values.ItemTags} />
                            </div>

                            <div>
                                <button onClick={() => handleClear()} style={ModerateItemStyling.clearButton}><p style={UniversalStyle.fontSizeMedium}>Clear</p></button>
                                <button type="submit" onClick={() => console.log("clicked submit")} style={ModerateItemStyling.addButton}><p style={UniversalStyle.fontSizeMedium}>Add to Database</p></button>
                            </div>
                        </Form>
                    )}
                </Formik>
                {/* <button onClick={() => handleClear()} style={ModerateItemStyling.button}><p style={UniversalStyle.fontSizeMedium}>Clear</p></button> */}
            </div>
        </div >
    );
}

export default AddItemForm;
