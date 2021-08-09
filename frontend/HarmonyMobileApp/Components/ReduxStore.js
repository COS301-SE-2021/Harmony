import { createStore } from 'redux';

const initialState = {
    Checked: [],
    MealTags: [],
    FoodTags: [],
    DrinkTags: [],
    Range: 30,
    userLocationLat: null,
    userLocationLong: null,
};

//reducer -method that takes the actions and changes the state
//parameters are passed with redux
const reducer = (state = initialState, action) => {
    switch (action.type) {
        //handles all the actions
        case "APPEND":
            //state.Checked.push(action.payload);
            if (action.payload.tagType == "drinks") {
                state.DrinkTags.push(action.payload.tagName)
            }
            else if (action.payload.tagType == "mealTypes") {
                state.MealTags.push(action.payload.tagName)
            }
            else if (action.payload.tagType == "food") {
                state.FoodTags.push(action.payload.tagName)
            }
            break;
        case "REMOVE":
            if (action.payload.tagType == "drinks") {
                for (var i = 0; i < state.DrinkTags.length; i++) {
                    if (state.DrinkTags[i].tagName == action.payload.tagName)
                        state.DrinkTags.splice(i, i);
                }
            }
            else if (action.payload.tagType == "mealTypes") {
                for (var i = 0; i < state.MealTags.length; i++) {
                    if (state.MealTags[i].tagName == action.payload.tagName)
                        state.MealTags.splice(i, i);
                }
            }
            else if (action.payload.tagType == "food") {
                console.log("in food " + state.FoodTags.length);
                for (var i = 0; i < state.FoodTags.length; i++) {
                    if (state.FoodTags[i].tagName == action.payload.tagName)
                        state.FoodTags.splice(i, i);
                }
            }
            break;
        case "RANGE":
            state.Range = action.payload.Range
            break;
        case "ADDLOCATION":
            state.userLocationLat = action.payload.latitude;
            state.userLocationLong = action.payload.longitude;
            break;
        case "CLEAR":
            state.Checked = [];
            state.MealTags = [];
            state.FoodTags = [];
            state.DrinkTags = [];
            break;
    }
    return state;
};

//takes 2 params, a reducer and an initial state[can be an object, array etc] in this case already initialised in reducer
const ReduxStore = createStore(reducer);

export default ReduxStore;