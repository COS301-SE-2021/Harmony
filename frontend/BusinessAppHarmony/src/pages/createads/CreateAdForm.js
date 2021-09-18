import React, { useState, useRef } from 'react';
import {
    Formik, Form
} from 'formik';
// classNames
import useStyles from "./styles";
import * as Yup from 'yup';
// components
import Multiselect from 'multiselect-react-dropdown';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
function CreateAdForm(...props) {
    /**The form variables */
    const defaultImage = "http://beepeers.com/assets/images/commerces/default-image.jpg";
    const [foodImage, setFoodImage] = useState(defaultImage);
    const [drinkImage, setDrinkImage] = useState(defaultImage);
    var classes = useStyles();

    /**@var fileRef to create a reference to the file input to be able to clear it */
    const foodFileRef = useRef();
    const drinkFileRef = useRef();

    /**@var tagSelector used to clear the multiple selectors on clear  */
    const foodTagSelector = useRef();
    const drinkTagSelector = useRef();
    const mealTagSelector = useRef();
    const audienceTagSelector = useRef();

    const supportedFormats = ['image/jpg', 'image/jpeg', 'image/png'];

    const mockResponse = {
        statusCode: 200,
        locations: ["Durban North", "Pretoria East", "Westiville"]
    }

    const handleClear = (values) => {
        setFoodImage(defaultImage);
        setDrinkImage(defaultImage);
        foodFileRef.current.value = "";
        drinkFileRef.current.value = "";
        // console.log(foodTagSelector.current.selectedList);

        /**in a try catch because if you try clearing a list thats already empty it should do nothing */
        try {
            foodTagSelector.current.resetSelectedValues();
            drinkTagSelector.current.resetSelectedValues();
            mealTagSelector.current.resetSelectedValues();
            audienceTagSelector.current.resetSelectedValues();
        } catch (error) {
        }

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
        if (supportedFormats.includes(e.target.files[0].type)) { reader.readAsDataURL(e.target.files[0]) }
        else {
            alert(e.target.files[0].type + " is not a supported file format.");
            setFoodImage(defaultImage);
        }
    }
    const DrinkImageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setDrinkImage(reader.result);
                // console.log(btoa(img))
            }
        }
        if (supportedFormats.includes(e.target.files[0].type)) { reader.readAsDataURL(e.target.files[0]) }
        else {
            alert(e.target.files[0].type + " is not a supported file format.");
            setDrinkImage(defaultImage);
        }
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
                    FoodName: "",
                    FoodTags: "",
                    DrinkName: "",
                    DrinkTags: "",
                    PairingDescription: "",
                    PairingTags: "",
                }}
                validationSchema={Yup.object().shape({
                    ItemName: Yup.string().required('*'),
                    ItemDescription: Yup.string().required('*'),
                    ItemTags: Yup.string().required('*'),

                    FoodName: Yup.string().required(true),
                    DrinkName: Yup.string().required(true),
                    PairingDescription: Yup.string().required(true),
                })}
                // onSubmit={(values) => handleSubmit(values)}
                onSubmit={(values, { resetForm }) => {
                    /**reset then handle submit */
                    resetForm();
                    handleSubmit(values);
                }}
            >
                {/** The moderate pairings form to submit */}
                {({ errors, touched, values, handleChange, resetForm }) => (
                    <Form>
                        <div className={classes.formElementsImageContainer}>
                            <div className={classes.PreviewContainer}>
                                <div className={classes.FoodLabelButton}>Food</div>
                                <div className={classes.PreviewPiece}><label htmlFor="file-input-Food"></label></div>
                                <div className={classes.PreviewPiece}><img src={foodImage} className={classes.ImageContainer} /></div>
                                <div className={classes.FileInput}><input type="file" id="file-input-Food" name="ImageclassNameFood" accept="image/*" ref={foodFileRef} onChange={FoodImageHandler} style={{ display: 'none' }} />
                                    <Button onClick={() => (foodFileRef.current.click())} className={classes.uploadFoodButton} variant="contained">Upload Image</Button>
                                </div>
                                <div className={classes.formElementsImageContainer}>
                                    <label htmlFor="FoodName" className={classes.formLabel}>
                                        <div className={classes.floatLeft}>
                                            <p className={classes.errorDiv}>Food Name</p>
                                        </div>
                                    </label>
                                    <TextField id="outlined-basic" error={errors.FoodName} variant="outlined" name="FoodName" className={classes.individualTextField} onChange={handleChange} value={values.FoodName} />
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
                                                optionContainer: { // To change css for option container 
                                                    'width': '100%'
                                                },
                                                multiselectContainer: {
                                                    'width': '100%',
                                                    'height': 20
                                                },
                                                inputField: {
                                                    'width': '100%',
                                                    'height': 20
                                                },
                                                chips: {
                                                    'background-color': '#FF6347',
                                                    'font-weight': 'bold',
                                                },
                                            }}
                                            onRemove={(selectedList) => (values.FoodTags = selectedList)}
                                            onSearch={function noRefCheck() { }}
                                            onSelect={(selectedList) => (values.FoodTags = selectedList)}
                                            id="FoodTags" name="FoodTags" onChange={handleChange} value={values.FoodTags}
                                            options={['Spicy', 'Savoury', 'Salty', 'Sweet', 'Sour', 'Warm', 'Hot', 'Cold']}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.PreviewContainer}>
                                <div className={classes.DrinkLabelButton}>Drink</div>
                                <div className={classes.PreviewPiece}><label htmlFor="file-input-Drink"></label></div>
                                <div className={classes.PreviewPiece}><img src={drinkImage} className={classes.ImageContainer} /></div>
                                <div className={classes.FileInput}><input type="file" id="file-input-Drink" name="ImageclassNameDrink" accept="image/*" ref={drinkFileRef} onChange={DrinkImageHandler} style={{ display: 'none' }} />
                                    <Button onClick={() => (drinkFileRef.current.click())} className={classes.uploadDrinkButton} variant="contained">Upload Image</Button>
                                </div>

                                <div className={classes.formElementsImageContainer}>
                                    <label htmlFor="Drink Name" className={classes.formLabel}>
                                        <div className={classes.floatLeft}>
                                            <p className={classes.errorDiv}>Drink Name</p>
                                        </div>

                                    </label>
                                    <TextField id="outlined-basic" error={errors.DrinkName} variant="outlined" name="DrinkName" className={classes.individualTextField} onChange={handleChange} value={values.DrinkName} />

                                </div>
                                <div className={classes.formElementsImageContainer}>
                                    <label htmlFor="DrinkTags" className={classes.formLabel}>
                                        <div className={classes.floatLeft}>
                                            <p className={classes.errorDiv}>Drink Tags</p>
                                        </div>
                                    </label>
                                    <div className={classes.multiselector}>
                                        <Multiselect
                                            isObject={false}
                                            disablePreSelectedValues
                                            avoidHighlightFirstOption
                                            selectionLimit={3}
                                            showArrow
                                            ref={drinkTagSelector}
                                            placeholder=""
                                            style={{
                                                optionContainer: { // To change css for option container 
                                                    'width': '100%'
                                                },
                                                searchBox: {
                                                    'width': '100%'
                                                },
                                                chips: {
                                                    'background-color': '#1FBFBA',
                                                    'font-weight': 'bold'
                                                },
                                            }}
                                            onRemove={(selectedList) => (values.DrinkTags = selectedList)}
                                            onSearch={function noRefCheck() { }}
                                            onSelect={(selectedList) => (values.DrinkTags = selectedList)}
                                            id="DrinkTags" name="DrinkTags" onChange={handleChange} value={values.DrinkTags}
                                            options={['Alcoholic', 'Non-Alcoholic', 'Fizzy', 'Sweet', 'Sour', 'Bitter', 'Warm', 'Hot', 'Cold']}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={classes.PreviewContainerPairing}>
                            <div className={classes.MealLabelButton}>Pairing</div>

                            <div className={classes.MealContainer}>
                                <div className={classes.formElementsPairing}>
                                    <label htmlFor="PairingDescription" className={classes.formLabel}>
                                        <div className={classes.floatLeft}><p className={classes.errorDiv}>Description</p> </div>
                                    </label>
                                    <TextField id="outlined-basic" multiline={true} rows={4} error={errors.PairingDescription} variant="outlined" name="PairingDescription" className={classes.individualTextField} onChange={handleChange} value={values.PairingDescription} />
                                </div>
                                <br />
                                <div className={classes.formElementsPairingTag}>
                                    <label htmlFor="ItemTags" className={classes.tagName}>
                                        <div className={classes.floatLeft}><p className={classes.errorDiv}>Tag</p> </div>
                                        <div className={classes.floatLeft}>
                                            {errors.ItemTags && touched.ItemTags ? (
                                                <div className={classes.errorStar}>*</div>
                                            ) : null}</div>
                                    </label>
                                    <div className={classes.multiselectorTag}>
                                        <Multiselect
                                            isObject={false}
                                            disablePreSelectedValues
                                            avoidHighlightFirstOption
                                            selectionLimit={1}
                                            showArrow
                                            placeholder=""
                                            ref={mealTagSelector}
                                            style={{
                                                optionContainer: { // To change css for option container 
                                                    'width': '100%'
                                                },
                                                searchBox: {
                                                    // 'border': '1px solid grey',
                                                    'width': '100%'
                                                },
                                                chips: {
                                                    'background-color': '#C41ED4',
                                                    'font-weight': 'bold',
                                                },
                                            }}
                                            onRemove={(selectedList) => (values.PairingTags = selectedList)}
                                            onSearch={function noRefCheck() { }}
                                            onSelect={(selectedList) => (values.PairingTags = selectedList)}
                                            id="PairingTags" name="PairingTags" onChange={handleChange} value={values.PairingTags}
                                            options={['Breakfast', 'Lunch', 'Supper', 'Snack', 'Vegetarian', 'Dairy-Free', 'Nut-Free']}
                                        />
                                    </div>
                                </div>
                                <div className={classes.clear}></div>

                            </div>
                        </div>
                        <br />
                        <div className={classes.PreviewContainerPairing}>
                            <div className={classes.configurationLabel}>Configuration</div>

                            <div className={classes.MealContainer}>
                                <div className={classes.formElementsImageContainer}>
                                    <div className={classes.configLabel}>

                                        <label htmlFor="ItemTags" className={classes.tagName}>
                                            <div className={classes.floatLeft}><p className={classes.errorDiv}>Locations</p> </div>
                                            <div className={classes.floatLeft}>
                                                {errors.ItemTags && touched.ItemTags ? (
                                                    <div className={classes.errorStar}>*</div>
                                                ) : null}</div>
                                        </label>
                                    </div>
                                    <div className={classes.multiselectorTag}>
                                        <Multiselect
                                            isObject={false}
                                            disablePreSelectedValues
                                            avoidHighlightFirstOption
                                            showArrow
                                            placeholder=""
                                            ref={mealTagSelector}
                                            style={{
                                                optionContainer: { // To change css for option container 
                                                    'width': '90%'
                                                },
                                                searchBox: {
                                                    // 'border': '1px solid grey',
                                                    'width': '90%'
                                                },
                                                chips: {
                                                    'background-color': '#4CD41E',
                                                    'font-weight': 'bold',
                                                },
                                            }}
                                            onRemove={(selectedList) => (values.PairingTags = selectedList)}
                                            onSearch={function noRefCheck() { }}
                                            onSelect={(selectedList) => (values.PairingTags = selectedList)}
                                            id="PairingTags" name="PairingTags" onChange={handleChange} value={values.PairingTags}
                                            options={mockResponse.locations}
                                        />
                                    </div>
                                </div>
                                <div className={classes.formElementsImageContainer}>
                                    <div className={classes.configLabel}>
                                        <label htmlFor="ItemTags" className={classes.tagName}>
                                            <div className={classes.floatLeft}><p className={classes.errorDiv}>Time Period</p> </div>
                                            <div className={classes.floatLeft}>
                                                {errors.ItemTags && touched.ItemTags ? (
                                                    <div className={classes.errorStar}>*</div>
                                                ) : null}</div>
                                        </label>
                                    </div>
                                    <div className={classes.multiselectorTag}>
                                        <Multiselect
                                            isObject={false}
                                            disablePreSelectedValues
                                            avoidHighlightFirstOption
                                            selectionLimit={1}
                                            showArrow
                                            placeholder=""
                                            ref={mealTagSelector}
                                            style={{
                                                optionContainer: { // To change css for option container 
                                                    'width': '90%'
                                                },
                                                searchBox: {
                                                    'width': '90%'
                                                },
                                                chips: {
                                                    'background-color': '#4CD41E',
                                                    'font-weight': 'bold'
                                                },
                                            }}
                                            onRemove={(selectedList) => (values.PairingTags = selectedList)}
                                            onSearch={function noRefCheck() { }}
                                            onSelect={(selectedList) => (values.PairingTags = selectedList)}
                                            id="PairingTags" name="PairingTags" onChange={handleChange} value={values.PairingTags}
                                            options={['One Day', 'One Month', 'Three Months', 'Six Months', 'One Year']}
                                        />
                                    </div>
                                </div>
                                <div className={classes.clear}></div>
                            </div>
                        </div>
                        <br />
                        <div className={classes.ButtonContainer}>
                            <Button onClick={(values) => (resetForm(), handleClear())} className={classes.clearButton} variant="contained">Clear</Button>
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
