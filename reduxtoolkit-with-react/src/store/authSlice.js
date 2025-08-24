import { createSlice } from "@reduxjs/toolkit";

//AUTH SLICE
const defaultAuthState = {authenticated: false}
export const authSlice = createSlice({
    name: "auth",
    initialState: defaultAuthState,
    reducers: {
        loggedIn(prevState){
            prevState.authenticated = true;//it may look like i'm mutating the state but redux toolkit handles the creation of a new state snap shot by itself for ever action. I can just modify part of the state i need to modify and redux toolkit will detect it
        },
        loggedOut(prevState){
            prevState.authenticated = false;
        }
    }
});

export const authActions = authSlice.actions;//this will give us access to all the action functions created to match the reducer functions of this slice. This action functions are what will be passed to the useDispatch() hook instead of passing an object becuase it exports its own's predefined object