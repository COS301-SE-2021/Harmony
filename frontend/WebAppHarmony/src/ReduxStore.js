

/**using redux since everytime onload the active bar resets to homepage
 * redux will force it to remember wi=hich is the active bar
 */
import { createStore } from 'redux';

const initialState = {
    activeBar: 'HOME'
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGEACTIVE":
            state.activeBar = action.payload
            break;
    }
    return state;
};

const ReduxStore = createStore(reducer);

export default ReduxStore;