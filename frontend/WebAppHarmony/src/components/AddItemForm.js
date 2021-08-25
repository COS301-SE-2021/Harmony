import React, { useState, useEffect } from 'react';
import ModerateItemStyling from '../Styling/ModerateItemStyling';
import {
    Formik, Form, useFormik
} from 'formik';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

function AddItemForm(itemName, itemDescription, itemTags, ...props) {
    /**The name, description and tags for the form */
    const [formName, setName] = useState(itemName.itemName);
    const [formDescription, setDescription] = useState(itemName.itemDescription);
    const [formTags, setTags] = useState(itemName.itemTags);
    const [FoodOrDrink, setFoodOrDrink] = React.useState('none');

    const [img, setImg] = useState("http://beepeers.com/assets/images/commerces/default-image.jpg");
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
    }

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
            <p>Add an item to the database:</p>
            <div>
                <Formik
                    onSubmit={() => (console.log("submitted"))}
                    initialValues={formik.values}
                >
                    {/** The moderate pairings form to submit */}
                    {({ values }) => (
                        <Form>
                            <div style={ModerateItemStyling.formElements}>
                                <div>
                                    <img src={img} />
                                </div>
                                <input type="file" id="file-input" name="ImageStyle" accept="image/*" onChange={imageHandler} />
                                <label htmlFor="file-input">upload an image</label>
                                <ToggleButtonGroup
                                    value={FoodOrDrink}
                                    exclusive
                                    onChange={HandleToggle}
                                    style={{ marginRight: 15, borderRadius: 15, }}
                                >
                                    <ToggleButton value="Food" color={{ backgroundColor: 'blue' }}>
                                        Food
                                    </ToggleButton>
                                    <ToggleButton value="Drink" >
                                        Drink
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>

                            <div style={ModerateItemStyling.formElements}>
                                <label htmlFor="ItemName" style={ModerateItemStyling.formLabel}>Item Name</label>
                                <input id="ItemName" name="ItemName" style={ModerateItemStyling.textField} onChange={formik.handleChange} value={formik.values.ItemName} />
                            </div>
                            <div style={ModerateItemStyling.formElements}>
                                <label htmlFor="ItemDescription" style={ModerateItemStyling.formLabel}>Item Description</label>
                                <input id="ItemDescription" name="ItemDescription" style={ModerateItemStyling.textField} onChange={formik.handleChange} value={formik.values.ItemDescription} />
                            </div>
                            <div style={ModerateItemStyling.formElements}>
                                <label htmlFor="Tags" style={ModerateItemStyling.formLabel}>Item Tags</label>
                                <input id="Tags" name="ItemTags" style={ModerateItemStyling.textField} onChange={formik.handleChange} value={formik.values.ItemTags} />
                            </div>

                            <div>
                                <button type="submit" onClick={() => console.log("clicked submit")} style={ModerateItemStyling.button}><p style={{ fontSize: 20, fontFamily: "sans-serif-light" }}>Add to Database</p></button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <button onClick={() => handleClear()} style={ModerateItemStyling.button}><p style={{ fontSize: 20, fontFamily: "sans-serif-light" }}>Clear</p></button>
            </div>
        </div>
    );
}

export default AddItemForm;
