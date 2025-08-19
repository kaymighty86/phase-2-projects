import { createStore } from "redux";

function counterStoreReducer(prevState = {count: 0}, actionObj){
    if(actionObj.type === "increment"){
        return {count: prevState.count + 1}
    }

    if(actionObj.type === "decrement"){
        return {count: prevState.count - 1}
    }

    return prevState;
}

const store = createStore(counterStoreReducer);

export default store;