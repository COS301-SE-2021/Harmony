import { createStore } from 'redux';

const initialState = {
    result: 1,
    lastValues: []
};
const ReduxReducer = (state = initialState, action) => {
    switch (action.type) {
        //handles all the actions
        case "ADD":
            state = state + action.payload;
            break;
        case "SUBTRACT":
            state = state - action.payload;
            break;
        case "NEW":
            state = state * action.payload;
            break;
    }
    return state;
};

const store = createStore(reducer);

export default ReduxStore;