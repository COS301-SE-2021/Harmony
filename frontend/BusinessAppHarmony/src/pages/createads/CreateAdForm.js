import React, { useState, useRef, useEffect } from 'react';
import {
    Formik, Form
} from 'formik';
import { Auth } from 'aws-amplify';
// classNames
import useStyles from "./styles";
import * as Yup from 'yup';
// components
import Multiselect from 'multiselect-react-dropdown';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import { InputNumber } from 'rsuite';
import { FiPlus, FiMinus } from "react-icons/fi";


function CreateAdForm(...props) {
    /**The form variables */
    const defaultImage = "http://beepeers.com/assets/images/commerces/default-image.jpg";
    const [foodImage, setFoodImage] = useState(defaultImage);
    const [drinkImage, setDrinkImage] = useState(defaultImage);
    const [result, setResult] = useState([]);
    const [radius, setRadius] = useState(35);
    var classes = useStyles();

    /**@var fileRef to create a reference to the file input to be able to clear it */
    const foodFileRef = useRef();
    const drinkFileRef = useRef();

    /**@var tagSelector used to clear the multiple selectors on clear  */
    const foodTagSelector = useRef();
    const drinkTagSelector = useRef();
    const mealTagSelector = useRef();
    const locationsTagSelector = useRef();
    const timePeriodTagSelector = useRef();

    const supportedFormats = ['image/jpg', 'image/jpeg', 'image/png'];


    useEffect(() => {
        fetch("https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/getprofile", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ BID: Auth.user.username })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setResult(result.Locations);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                }
            )
    }, [])

    const handleClear = (values) => {
        setFoodImage(defaultImage);
        setDrinkImage(defaultImage);
        foodFileRef.current.value = "";
        drinkFileRef.current.value = "";

        /**in a try catch because if you try clearing a list thats already empty it should do nothing */
        try {
            foodTagSelector.current.resetSelectedValues();
            drinkTagSelector.current.resetSelectedValues();
            mealTagSelector.current.resetSelectedValues();
            locationsTagSelector.current.resetSelectedValues();
            timePeriodTagSelector.current.resetSelectedValues();
        } catch (error) {
        }

    }

    /**Handles the image preview */
    const FoodImageHandler = (e, values) => {
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
        var request = {
            FoodName: vals.FoodName,
            DrinkName: vals.DrinkName,
            BID: Auth.user.username,
            FoodTags: vals.FoodTags,
            DrinkTags: vals.DrinkTags,
            PairingTags: vals.PairingTags,
            Description: vals.PairingDescription,
            Locations: vals.Locations,
            TimePeriod: vals.TimePeriod,
            FoodImage: foodImage.split(',')[1],
            DrinkImage: drinkImage.split(',')[1],
            Radius: radius
        }
        console.log("request to submit " + JSON.stringify(request))
        fetch('https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/createbusinesspairing', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(request)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .then(alert("Advert for " + vals.FoodName + " and " + vals.DrinkName + " was created successfully."))
    }

    return (
        <div className={classes.addItemContainer}>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    FoodName: "",
                    FoodTags: "",
                    DrinkName: "",
                    DrinkTags: "",
                    PairingDescription: "",
                    PairingTags: "",
                    Locations: "",
                    TimePeriod: "",
                    Radius: 20
                }}
                validationSchema={Yup.object().shape({
                    FoodName: Yup.string().required('*'),
                    DrinkName: Yup.string().required('*'),
                    PairingDescription: Yup.string().required('*'),

                })}
                // onSubmit={(values) => handleSubmit(values)}
                onSubmit={(values, { resetForm }) => {
                    if (foodImage === defaultImage || drinkImage === defaultImage || values.FoodTags === [] || values.DrinkTags === [] || values.PairingTags === [] || values.Locations === [] || values.TimePeriod === []) {
                        if (foodImage == defaultImage)
                            alert("You havent uploaded an image for food.");
                        else if (drinkImage == defaultImage)
                            alert("You havent uploaded an image for drink.");
                        else
                            alert("One of your tag fields are blank.");

                    }
                    else {                    /**reset then handle submit */
                        resetForm();
                        handleClear();
                        handleSubmit(values);
                    }
                }}
            >
                {/** The moderate pairings form to submit */}
                {({ errors, touched, values, handleChange, resetForm }) => (
                    <Form>
                        <div className={classes.formElementsImageContainer}>
                            <div className={classes.PreviewContainer}>
                                <div className={classes.FoodLabelButton}>Food</div>
                                <div className={classes.PreviewPiece}><label htmlFor="file-input-Food"></label></div>
                                <div className={classes.PreviewPiece}><img src={foodImage} className={classes.ImageContainer} alt="Error displaying." /></div>
                                <div className={classes.FileInput}><input type="file" id="file-input-Food" name="ImageclassNameFood" accept="image/*" ref={foodFileRef} onChange={(values) => FoodImageHandler(values)} style={{ display: 'none' }} />
                                    <Button onClick={() => (foodFileRef.current.click())} className={classes.uploadFoodButton} variant="contained">Upload Image</Button>
                                </div>
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
                                    {/* <TextField id="outlined-basic" error={errors.FoodName} variant="outlined" name="FoodName" className={classes.individualTextField} onChange={handleChange} value={values.FoodName} /> */}
                                    <TextField id="outlined-basic" variant="outlined" name="FoodName" className={classes.individualTextField} onChange={handleChange} value={values.FoodName} />
                                </div>
                                <div className={classes.formElementsImageContainer}>
                                    <label htmlFor="FoodTags" className={classes.formLabel}>
                                        <div className={classes.floatLeft}>
                                            <p className={classes.errorDiv}>Food Tags <br />(max 3)</p>
                                        </div>
                                        <div className={classes.floatLeft}>
                                            {(values.FoodTags == [] && touched.FoodTags) ? (
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
                                                    'width': '100%',
                                                },

                                                multiselectContainer: {
                                                    'width': '100%',
                                                    'height': 20,
                                                },
                                                inputField: {
                                                    'width': '100%',
                                                    'height': 20,
                                                },
                                                chips: {
                                                    'backgroundColor': '#FF6347',
                                                    'fontWeight': 'bold',
                                                },
                                            }}
                                            onRemove={(selectedList) => (values.FoodTags = selectedList)}
                                            onSearch={function noRefCheck() { }}
                                            onSelect={(selectedList) => (values.FoodTags = selectedList)}
                                            id="FoodTags" name="FoodTags" value={values.FoodTags}
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
                                        <div className={classes.floatLeft}>
                                            {(errors.DrinkName && touched.DrinkName) ? (
                                                <div className={classes.errorStar}>*</div>
                                            ) : null}
                                        </div>
                                    </label>
                                    <TextField id="outlined-basic" variant="outlined" name="DrinkName" className={classes.individualTextField} onChange={handleChange} value={values.DrinkName} />

                                </div>
                                <div className={classes.formElementsImageContainer}>
                                    <label htmlFor="DrinkTags" className={classes.formLabel}>
                                        <div className={classes.floatLeft}>
                                            <p className={classes.errorDiv}>Drink Tags <br />(max 3)</p>
                                        </div>
                                        <div className={classes.floatLeft}>
                                            {(values.DrinkTags == [] && touched.DrinkTags) ? (
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
                                                    'backgroundColor': '#1FBFBA',
                                                    'fontWeight': 'bold'
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
                                        <div className={classes.floatLeft}><p className={classes.errorDivDescr}>Description</p> </div>
                                        <div className={classes.floatLeft}>
                                            {(errors.PairingDescription && touched.PairingDescription) ? (
                                                <div className={classes.errorStar}>*</div>
                                            ) : null}
                                        </div>
                                    </label>
                                    <TextField id="outlined-basic" multiline={true} rows={4} variant="outlined" name="PairingDescription" className={classes.individualTextField} onChange={handleChange} value={values.PairingDescription} />
                                </div>
                                <br />
                                <div className={classes.formElementsPairingTag}>
                                    <label htmlFor="PairingTags" className={classes.tagName}>
                                        <div className={classes.floatLeft}><p className={classes.errorDiv}>Tag <br />(max 1)</p> </div>
                                        <div className={classes.floatLeft}>
                                            {(values.PairingTags == [] && touched.PairingTags) ? (
                                                <div className={classes.errorStar}>*</div>
                                            ) : null}
                                        </div>
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
                                                    'backgroundColor': '#C41ED4',
                                                    'fontWeight': 'bold',
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

                                        <label htmlFor="Locations" className={classes.tagName}>
                                            <div className={classes.floatLeft}><p className={classes.errorDiv}>Locations</p> </div>
                                            <div className={classes.floatLeft}>
                                                {(values.Locations == [] && touched.Locations) ? (
                                                    <div className={classes.errorStar}>*</div>
                                                ) : null}
                                            </div>
                                        </label>
                                    </div>
                                    <div className={classes.multiselectorTag}>
                                        <Multiselect
                                            isObject={false}
                                            disablePreSelectedValues
                                            avoidHighlightFirstOption
                                            showArrow
                                            placeholder=""
                                            ref={locationsTagSelector}
                                            style={{
                                                optionContainer: { // To change css for option container 
                                                    'width': '90%'
                                                },
                                                searchBox: {
                                                    // 'border': '1px solid grey',
                                                    'width': '90%'
                                                },
                                                chips: {
                                                    'backgroundColor': '#4CD41E',
                                                    'fontWeight': 'bold',
                                                },
                                            }}
                                            onRemove={(selectedList) => (values.Locations = selectedList)}
                                            onSearch={function noRefCheck() { }}
                                            onSelect={(selectedList) => (values.Locations = selectedList)}
                                            id="Locations" name="Locations" onChange={handleChange} value={values.Locations}
                                            options={result}
                                        />
                                    </div>
                                </div>

                                <div className={classes.formElementsImageContainer}>
                                    <div className={classes.configLabel}>

                                        <label htmlFor="Locations" className={classes.tagName}>
                                            <div className={classes.floatLeft}><p className={classes.errorDiv}>Radius</p> </div>
                                        </label>
                                    </div>
                                    <div className={classes.multiselectorTag}>
                                        <div>
                                            <FiMinus className={classes.radiusIcon} onClick={() => setRadius(radius.valueOf(radius) - 5)} />
                                            <InputNumber
                                                min={5}
                                                max={100}
                                                step={5}
                                                postfix="KM"
                                                value={radius}
                                                onChange={value => {
                                                    setRadius(value);
                                                }}
                                                style={{ display: "none", float: "left" }}
                                            />
                                            <div className={classes.floatLeft}>
                                                <p style={{ marginTop: 0, marginLeft: 10, marginRight: 10, fontSize: 20 }}>
                                                    {radius} KM
                                                </p>
                                            </div>
                                            <FiPlus className={classes.radiusIcon} onClick={() => setRadius(radius.valueOf(radius) + 5)} />
                                        </div>
                                    </div>
                                </div>
                                <div>




                                </div>


                                <div className={classes.formElementsImageContainer}>
                                    <div className={classes.configLabel}>
                                        <label htmlFor="TimePeriod" className={classes.tagName}>
                                            <div className={classes.floatLeft}><p className={classes.errorDiv}>Time Period <br />(max 1)</p> </div>
                                            <div className={classes.floatLeft}>
                                                {(values.TimePeriod == [] && touched.TimePeriod) ? (
                                                    <div className={classes.errorStar}>*</div>
                                                ) : null}
                                            </div>
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
                                            ref={timePeriodTagSelector}
                                            style={{
                                                optionContainer: { // To change css for option container 
                                                    'width': '90%'
                                                },
                                                searchBox: {
                                                    'width': '90%'
                                                },
                                                chips: {
                                                    'backgroundColor': '#4CD41E',
                                                    'fontWeight': 'bold'
                                                },
                                            }}
                                            onRemove={(selectedList) => (values.TimePeriod = selectedList)}
                                            onSearch={function noRefCheck() { }}
                                            onSelect={(selectedList) => (values.TimePeriod = selectedList)}
                                            id="TimePeriod" name="TimePeriod" onChange={handleChange} value={values.TimePeriod}
                                            options={['One Day', 'One Week', 'One Month', 'Three Months', 'Six Months', 'One Year']}
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
