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
import Multiselect from 'multiselect-react-dropdown';
import Button from '@material-ui/core/Button';

function CreateAdForm(...props) {
    /**The form variables */
    const [foodImage, setFoodImage] = useState("http://beepeers.com/assets/images/commerces/default-image.jpg");
    const [drinkImage, setDrinkImage] = useState("http://beepeers.com/assets/images/commerces/default-image.jpg");
    const [formFoodName, setFoodName] = useState("");
    const [formDrinkName, setDrinkName] = useState("");
    const [formPairingDescr, setPairingDescr] = useState("");
    var classes = useStyles();

    /**@var used to create a reference to the file input to be able to clear it */
    const foodFileRef = useRef();
    const drinkFileRef = useRef();
    const foodTagSelector = useRef();



    const handleClear = (values) => {
        setFoodName("");
        setDrinkName("");
        setPairingDescr("");
        setFoodImage("http://beepeers.com/assets/images/commerces/default-image.jpg");
        setDrinkImage("http://beepeers.com/assets/images/commerces/default-image.jpg");
        foodFileRef.current.value = "";
        drinkFileRef.current.value = "";

        foodTagSelector.current.selectedList = "";
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
                enableReinitialize={true}
                initialValues={{
                    ItemName: "",
                    ItemDescription: "",
                    ItemTags: "",
                    FoodName: formFoodName,
                    FoodTags: "",
                    DrinkName: formDrinkName,
                    DrinkTags: "",
                    PairingDescription: formPairingDescr,
                    PairingTags: "",
                }}
                validationSchema={Yup.object().shape({
                    ItemName: Yup.string().required('*'),
                    ItemDescription: Yup.string().required('*'),
                    ItemTags: Yup.string().required('*'),

                    FoodName: Yup.string().required('*'),
                    DrinkName: Yup.string().required('*'),
                    PairingDescription: Yup.string().required('*'),
                })}
                // onSubmit={(values) => handleSubmit(values)}
                onSubmit={(values, { resetForm }) => {
                    /**reset then handle submit */
                    resetForm();
                    handleSubmit(values);
                }}
            >
                {/** The moderate pairings form to submit */}
                {({ errors, touched, values, handleChange }) => (
                    <Form>
                        <div className={classes.formElementsImageContainer}>
                            <div className={classes.PreviewContainer}>
                                <div className={classes.FoodLabelButton}>Food</div>
                                <div className={classes.PreviewPiece}><label htmlFor="file-input-Food"></label></div>
                                <div className={classes.PreviewPiece}><img src={foodImage} className={classes.ImageContainer} /></div>
                                <div className={classes.FileInput}><input type="file" id="file-input-Food" name="ImageclassNameFood" accept="image/*" ref={foodFileRef} onChange={FoodImageHandler} /></div>
                                <div className={classes.formElementsImageContainer}>
                                    <label htmlFor="FoodName" className={classes.formLabel}>
                                        <div className={classes.floatLeft}>
                                            <p className={classes.errorDiv}>Food Name</p>
                                        </div>
                                        <div className={classes.floatLeft}>
                                            {(errors.FoodName && touched.FoodName) ? (
                                                <div className={classes.errorStar}>*</div>
                                            ) : null}
                                        </div>
                                    </label>
                                    <Field id="FoodName" name="FoodName" className={classes.individualTextField} onChange={handleChange} value={values.FoodName} />
                                </div>
                                <div className={classes.formElementsImageContainer}>
                                    <label htmlFor="FoodTags" className={classes.formLabel}>
                                        <div className={classes.floatLeft}>
                                            <p className={classes.errorDiv}>Food Tags</p>
                                        </div>
                                        <div className={classes.floatLeft}>
                                            {(errors.FoodTags && touched.FoodTags) ? (
                                                <div className={classes.errorStar}>*</div>
                                            ) : null}
                                        </div>
                                    </label>
                                    <div className={classes.multiselector}>
                                        <Multiselect
                                            isObject={false}
                                            disablePreSelectedValues
                                            avoidHighlightFirstOption
                                            selectionLimit={3}
                                            showArrow
                                            ref={foodTagSelector}
                                            placeholder=""
                                            style={{
                                                searchBox: {
                                                    'border': '1px solid grey',
                                                    'border-radius': '0px',
                                                    'width': '100%'
                                                },
                                                chips: {
                                                    'background-color': '#FF6347'
                                                },
                                            }}
                                            onRemove={(selectedList) => (values.FoodTags = selectedList)}
                                            onSearch={function noRefCheck() { }}
                                            onSelect={(selectedList) => (values.FoodTags = selectedList)}
                                            id="FoodTags" name="FoodTags" onChange={handleChange} value={values.FoodTags}
                                            options={[
                                                'Spicy',
                                                'Savoury',
                                                'Salty',
                                                'Sweet',
                                                'Sour',
                                                'Warm',
                                                'Hot',
                                                'Cold',
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.PreviewContainer}>
                                <div className={classes.DrinkLabelButton}>Drink</div>
                                <div className={classes.PreviewPiece}><label htmlFor="file-input-Drink"></label></div>
                                <div className={classes.PreviewPiece}><img src={drinkImage} className={classes.ImageContainer} /></div>
                                <div className={classes.FileInput}><input type="file" id="file-input-Drink" name="ImageclassNameDrink" accept="image/*" ref={drinkFileRef} onChange={DrinkImageHandler} /></div>
                                <div className={classes.formElementsImageContainer}>
                                    <label htmlFor="Drink Name" className={classes.formLabel}>
                                        <div className={classes.floatLeft}>
                                            <p className={classes.errorDiv}>Drink Name</p>
                                        </div>
                                        <div className={classes.floatLeft}>
                                            {(errors.DrinkName && touched.DrinkName) ? (
                                                <div className={classes.errorStar}>*</div>
                                            ) : null}
                                        </div>
                                    </label>
                                    <Field id="DrinkName" name="DrinkName" className={classes.individualTextField} onChange={handleChange} value={values.DrinkName} />
                                </div>
                                <div className={classes.formElementsImageContainer}>
                                    <label htmlFor="DrinkTags" className={classes.formLabel}>
                                        <div className={classes.floatLeft}>
                                            <p className={classes.errorDiv}>Drink Tags</p>
                                        </div>
                                        <div className={classes.floatLeft}>
                                            {(errors.DrinkTags && touched.DrinkTags) ? (
                                                <div className={classes.errorStar}>*</div>
                                            ) : null}
                                        </div>
                                    </label>
                                    <div className={classes.multiselector}>
                                        <Multiselect
                                            isObject={false}
                                            disablePreSelectedValues
                                            avoidHighlightFirstOption
                                            selectionLimit={3}
                                            showArrow
                                            placeholder=""
                                            style={{
                                                searchBox: {
                                                    'border': '1px solid grey',
                                                    'border-radius': '0px',
                                                    'width': '100%'
                                                },
                                                chips: {
                                                    'background-color': '#1FBFBA'
                                                },
                                            }}
                                            onRemove={(selectedList) => (values.DrinkTags = selectedList)}
                                            onSearch={function noRefCheck() { }}
                                            onSelect={(selectedList) => (values.DrinkTags = selectedList)}
                                            id="DrinkTags" name="DrinkTags" onChange={handleChange} value={values.DrinkTags}
                                            options={[
                                                'Alcoholic',
                                                'Non-Alcoholic',
                                                'Fizzy',
                                                'Sweet',
                                                'Sour',
                                                'Bitter',
                                                'Warm',
                                                'Hot',
                                                'Cold',
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={classes.MealLabelButton}>Pairing</div>

                        <div className={classes.MealContainer}>
                            <div className={classes.formElementsPairing}>
                                <label htmlFor="PairingDescription" className={classes.formLabel}>
                                    <div className={classes.floatLeft}><p className={classes.errorDiv}>Description</p> </div><div className={classes.floatLeft}>
                                        {errors.PairingDescription && touched.PairingDescription ? (
                                            <div className={classes.errorStar}>*</div>
                                        ) : null}</div>
                                </label>
                                <Field id="PairingDescription" name="PairingDescription" className={classes.textField} onChange={handleChange} value={values.PairingDescription} />
                            </div>
                            <div className={[classes.formElements]}>
                                <label htmlFor="ItemTags" className={classes.formLabel}>
                                    <div className={classes.floatLeft}><p className={classes.errorDiv}>Tag</p> </div><div className={classes.floatLeft}>
                                        {errors.ItemTags && touched.ItemTags ? (
                                            <div className={classes.errorStar}>*</div>
                                        ) : null}</div>
                                </label>
                                <div className={classes.multiselector}>
                                    <Multiselect
                                        isObject={false}
                                        disablePreSelectedValues
                                        avoidHighlightFirstOption
                                        selectionLimit={1}
                                        showArrow
                                        placeholder=""
                                        style={{
                                            searchBox: {
                                                'border': '1px solid grey',
                                                'border-radius': '0px',
                                                'width': '40%'
                                            },
                                            chips: {
                                                'background-color': '#C41ED4'
                                            },
                                        }}
                                        onRemove={(selectedList) => (values.PairingTags = selectedList)}
                                        onSearch={function noRefCheck() { }}
                                        onSelect={(selectedList) => (values.PairingTags = selectedList)}
                                        id="PairingTags" name="PairingTags" onChange={handleChange} value={values.PairingTags}
                                        options={[
                                            'Breakfast',
                                            'Lunch',
                                            'Supper',
                                            'Snack',
                                            'Vegetarian',
                                            'Dairy-Free',
                                            'Nut-Free',
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <Button onClick={(values) => handleClear(values)} className={classes.clearButton} variant="contained">Clear</Button>
                            <Button variant="contained" color="primary" type="submit" className={classes.addButton} onClick={() => console.log("clicked submit")}>
                                Create Advert
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    );
}

export default CreateAdForm;
