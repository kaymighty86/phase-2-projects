import { redirect } from "react-router-dom";

export function setAuthToken(token = null){
    if(token != null || token !== undefined){
        localStorage.setItem("authToken", token);
        
        //set expiry time (as the backend also deletes the token afer a while)
        let tokenExpiryTime = new Date();
        tokenExpiryTime.setHours(tokenExpiryTime.getHours() + 1);
        localStorage.setItem("tokenExpiryTime", tokenExpiryTime.toISOString());
    }
}

export function getAuthToken(){
    let token = localStorage.getItem("authToken");

    if(token && getTokenDuration() < 0){//check if the token has expired and delete
        deleteAuthToken();
        token = undefined;//return unefined value so that whoever calls it can do the needful
    }

    return token;
}

export function isAuthenticated(){
    return getAuthToken()? true : false;
}

export function deleteAuthToken(){
    localStorage.removeItem("authToken");
}

export function getTokenDuration(){
    const tokenExpiryDate = new Date(localStorage.getItem("tokenExpiryTime"));
    const now = new Date();
    
    return tokenExpiryDate.getTime() - now.getTime();
}

//---------------------------
//LOADERS
//---------------------------
export function authCheckLoader({request}){//thi is a loader function for routes that need it so that proper routing can be done

    if(!isAuthenticated()){
        return redirect(`/auth?redirect=${request.url}`);//redirect to the login route but set the current URL as a "redirect" param, for when the login is complete, the login page knows how it will redirect back to the current route
    }
    else{
        return null;//we're good. We return null here becuase a loader must return something, if there is nothing to return, just return null
    }
}

export function tokenLoader(){//this loader is used by the root route so that we can get current token everytime we use "redirect" function to navigate to it
    return localStorage.getItem("authToken");
}