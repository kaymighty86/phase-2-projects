const redux = require("redux");

//create the stores reducer
function reducerFunction(prevState = {count: 0}, action){

    if(action.type === "increment"){
        return {count: prevState.count + 1};
    }

    if(action.type === "decrement"){
        return {count: prevState.count - 1};
    }

    return prevState;
}
//create a new store
const store = redux.createStore(reducerFunction);

//subscribe listeners to the store to listen to state change
store.subscribe(listenerOne);

//create listener
function listenerOne(){
    const currentState = store.getState();
    console.log(currentState);
}


store.dispatch({type: "increment"});
// store.dispatch("decrement");