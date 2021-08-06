import { createStore } from 'redux';

const initialState = {
    result: 1,
    Checked: [],
    // mealTypes: [{ "Breakfast": { "backgroundColor": "#F3F2F2", "textColor": "black" } },
    // { "Lunch": { "backgroundColor": "#F3F2F2", "textColor": "black" } }, { "Supper": { "backgroundColor": "#F3F2F2", "textColor": "black" } }, { "Snack": { "backgroundColor": "#F3F2F2", "textColor": "black" } }, { "Vegetarian": { "backgroundColor": "#F3F2F2", "textColor": "black" } }, { "Dairy-Free": { "backgroundColor": "#F3F2F2", "textColor": "black" } }, { "Nut-Free": { "backgroundColor": "#F3F2F2", "textColor": "black" } }],
    // foods: [{ "Spicy": "#F3F2F2" }, { "Savoury": "#F3F2F2" }, { "Salty": "#F3F2F2" }, { "Sweet": "#F3F2F2" }, { "Sour": "#F3F2F2" }, { "Hot": "#F3F2F2" }, { "Warm": "#F3F2F2" }, { "Cold": "#F3F2F2" }],
    // drinks: [{ "Alcoholic": "#F3F2F2" }, { "Non-Alcoholic": "#F3F2F2" }, { "Fizzy": "#F3F2F2" }, { "Sweet": "#F3F2F2" }, { "Sour": "#F3F2F2" }, { "Bitter": "#F3F2F2" }, { "Hot": "#F3F2F2" }, { "Warm": "#F3F2F2" }, { "Cold": "#F3F2F2" },],
};

//reducer -method that takes the actions and changes the state
//parameters are passed with redux
const reducer = (state = initialState, action) => {
    switch (action.type) {
        //handles all the actions
        case "Breakfast":
            state.mealTypes[0].Breakfast.backgroundColor = action.payload.backgroundColor;
            state.mealTypes[0].Breakfast.textColor = action.payload.textColor;
            break;
        case "APPEND":
            state.Checked.push(action.payload);
            break;
        case "NEW":
            state.result = state.result * action.payload;
            break;
    }
    return state;
};

//takes 2 params, a reducer and an initial state[can be an object, array etc] in this case already initialised in reducer
const ReduxStore = createStore(reducer);

export default ReduxStore;