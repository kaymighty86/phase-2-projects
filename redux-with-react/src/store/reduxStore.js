import { createStore } from "redux";

const defaultState = {count: 0, counterActive: true}

function counterStoreReducer(prevState = defaultState, actionObj){

    if(actionObj.type === "increment"){
        return {
            ...prevState,
            count: prevState.count + 1
        }
    }

    if(actionObj.type === "increase"){
        return {
            ...prevState,
            count: prevState.count + actionObj.value
        }
    }

    if(actionObj.type === "decrement"){
        return {
            ...prevState,
            count: prevState.count - 1
        }
    }

    if(actionObj.type === "toggleCounter"){
        return {
            ...prevState,
            counterActive: actionObj.value
        }
    }

    return prevState;
}

const store = createStore(counterStoreReducer);

export default store;