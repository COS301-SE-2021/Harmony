import { createStore } from 'redux';

const initialState = {
    result: 1,
    lastValues: []
};

//reducer -method that takes the actions and changes the state
//parameters are passed with redux
const reducer = (state = initialState, action) => {
    switch (action.type) {
        //handles all the actions
        case "ADD":
            state.result += action.payload;
            break;
        case "SUBTRACT":
            state.result -= action.payload;
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