import PageContent from "../components/PageContent";
import { useRouteError, Link } from "react-router-dom";

//we are setting just one errorElement in the root path, however any path can have an error element (when you throw an error, the nearest error element will catch it with "useRouteError()" hook
export default function ErrorPage(){

    //we are expecting that a "Response" object is what should be thrown anywhere in this app when there is an error
    const error = useRouteError();//anything at all that is thrown anywhere in the route will be captured here, and anything can be thrown; either strings, objects, "Response" objects, etc.

    let header = "Error";
    let message = "Bad request";

    //if the error is from the router (e.g. router error is thrown with code 404)
    if(error.status == 404){
        header = "Invalid Request";
        message = "You are either trying to visit a page that doesn't exist or making a request that cannot be handled currently.";
    }
    else if(error.status == 500){//this is our custom error code we are throwing in app for other types of errors
        header = "Encountered an Error";
        message = JSON.parse(error.data).message;//the data sent through Response objects are in json format
    }

    return (
        <PageContent title={header}>
            <p>{message}</p>
            <Link to="">Home</Link>
        </PageContent>
    );
}