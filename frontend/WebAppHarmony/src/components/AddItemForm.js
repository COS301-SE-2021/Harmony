import React, { useState, useRef } from 'react';
import UniversalStyle from '../Styling/UniversalStyle';
import ModerateItemStyling from '../Styling/ModerateItemStyling';
import {
    Formik, Form, Field, useFormik
} from 'formik';

function AddItemForm(itemName, itemDescription, itemTags, ...props) {
    /**The name, description and tags for the form */
    const [formName, setName] = useState(itemName.itemName);
    const [formDescription, setDescription] = useState(itemName.itemDescription);
    const [formTags, setTags] = useState(itemName.itemTags);
    const formReference = useRef(null);

    /**The initial values for the form */
    const formik = useFormik(
        {
            initialValues: {
                ItemName: itemName.itemName,
                ItemDescription: itemName.itemDescription,
                ItemTags: itemName.itemTags
            }
        }
    )
    /*Access form values with formik.values */
    console.log(formik.values);

    const handleClear = () => {
        setName(" ");
        setDescription(" ");
        setTags(" ");
    }

    return (
        <div style={ModerateItemStyling.addItemContainer}>
            <p>Add an item to the database:</p>
            <div>
                <Formik
                    onSubmit={() => (console.log("submitted"))}
                    innerRef={formReference}
                    initialValues={{ ItemName: "test" }}
                >
                    {/** The moderate pairings form to submit */}
                    {({ values }) => (
                        <Form>
                            <div style={ModerateItemStyling.formElements}>
                                <input type="file" id="file-input" name="ImageStyle" />
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
