
import errorLibrary from "./data/errorLibrary.json";

export async function fetchAvailablePlaces(){
    const response = await fetch("http://localhost:3000/places");
    const responseData = await response.json();

    if(!response.ok){
        throw new Error(responseData.message);
    }

    return responseData.places;
}

export async function updateUserPlaces(userPlaces){
    const response = await fetch("http://localhost:3000/user-places", {
        method: "PUT",
        body: JSON.stringify({places: userPlaces}),
        headers: {
            "Content-Type" : "application/json"
        }
    });
    const responseData = await response.json();

    if(!response.ok){
        throw new Error (responseData.message);
    }
    
    return response.ok;//just return the response status
}