import { createStore } from 'redux';

const initialState = {
    Checked: [],
    MealTags: [],
    FoodTags: [],
    DrinkTags: [],
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
            for (var i = 0; i < state.Checked.length; i++) {
                if ((state.Checked[i].tagName == action.payload.tagName) && (state.Checked[i].tagType == action.payload.tagType)) {
                    state.Checked.splice(i, i)
                }
            }
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