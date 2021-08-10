import { createStore } from 'redux';

const initialState = {
    MealTags: [],
    FoodTags: [],
    DrinkTags: [],
    Range: null,
    userLocationLat: null,
    userLocationLong: null,
    ApplyFilter: false,
    sortPairings: "Trending"
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
                    if (state.DrinkTags[i] == action.payload.tagName) {
                        state.DrinkTags.splice(i, 1);
                    }
                }
            }
            else if (action.payload.tagType == "mealTypes") {
                for (var i = 0; i < state.MealTags.length; i++) {
                    if (state.MealTags[i] == action.payload.tagName)
                        state.MealTags.splice(i, 1);
                }
            }
            else if (action.payload.tagType == "food") {
                for (var i = 0; i < state.FoodTags.length; i++) {
                    if (state.FoodTags[i] == action.payload.tagName)
                        state.FoodTags.splice(i, 1);
                }
            }
            break;
        case "UPDATERANGE":
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
        case "APPLYFILTER":
            state.ApplyFilter = action.payload.ApplyFilter;
            break;
        case "CHANGESORT":
            state.sortPairings = action.payload.sort;
            break;
    }
    return state;
};

//takes 2 params, a reducer and an initial state[can be an object, array etc] in this case already initialised in reducer
const ReduxStore = createStore(reducer);

export default ReduxStore;