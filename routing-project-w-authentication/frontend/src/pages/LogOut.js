import { redirect } from "react-router-dom";
import { deleteAuthToken } from "../util/authUtils";

export function logOutAction(){
    deleteAuthToken();
    
    console.log("You have been logged out successfully.");

    return redirect("/auth");
}