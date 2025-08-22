import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const defaultState = {count: 0, counterActive: true}

const counterSlice = createSlice({
    name: "counter",
    state: defaultState,
    reducers: {
        increment(prevState){
            prevState.count + 1;//it may look like i'm mutating the state but redux toolkit handles the creation of a new state snap shot by itself for ever action. I can just modify part of the state i need to modify and redux toolkit will detect it
        },
        increase(prevState, action){
            prevState.count + action.payload;//the payload prop in the passed action object is defined by redux toolkit when i execute an action function whenever i'm dispatching an action
        },
        decrement(prevState){
            prevState.count - 1;
        },
        toggleCounter(prevState, action){
            prevState.counterActive = action.payload;
        },
    }
});

export const counterActions = counterSlice.actions;//this will give us access to all the action functions created to match the reducer functions of this slice. This action functions are what will be passed to the useDispatch() hook instead of passing an object becuase it exports its own's predefined object

//you can put all the reducers of the multiple slices created (if applicable) in this object. Seperated by comma of course
const store = configureStore({
    reducer: {
        counterReducer: counterSlice.reducer
    }
});


export default store;