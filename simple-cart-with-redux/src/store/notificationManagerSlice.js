import { createSlice } from "@reduxjs/toolkit";

export const notificationManagerSlice = createSlice({
    name: "notificationManager",
    initialState: {notifications: []},
    reducers: {
        addItem(state, action){
            const notiticatonItem = {
                title: action.payload.title,
                message: action.payload.message,
                status: action.payload.status
            }

            state.notifications.push(notiticatonItem);//this payload must be an object containing title, message, and status
        },
        removeOldestItem(state){
            state.notifications.splice(0,1);
        }
    }
});

export function showNotification({title, message, status = "success"}){
    //ADDING ITEM
    //REMOVE NOTIFICATION
    return async function(dispatch){

    }
}