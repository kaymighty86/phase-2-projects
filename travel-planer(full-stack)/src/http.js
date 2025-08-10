
import errorLibrary from "./data/errorLibrary.json";

export async function fetchAvailablePlaces(){
    const response = await fetch("http://localhost:3000/places");
    const responseData = await response.json();

    if(!response.ok){
        throw new Error(`${errorLibrary.customError} ${responseData.message}`);
    }

    return responseData.places;
}

export async function fetchSelectedPlaces(){
    const response = await fetch("http://localhost:3000/user-places");
    const responseData = await response.json();

    if(!response.ok){
        throw new Error(`${errorLibrary.customError} ${responseData.message}`);
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


//decided to try out my own code for fetching information from backend via AJAX
// function placesFetcher(endpointURL, requestData = {type: "GET", body: {}}){
//   return new Promise((resolve, reject)=>{
//     const placesRequest = new XMLHttpRequest();
//     placesRequest.onreadystatechange = function(){
//       if(this.readyState == 4){
//         if(this.status == 200){
//           resolve(JSON.parse(this.responseText));
//         }
//       }
//     };
//     placesRequest.open(requestData.type, endpointURL, true);
//     placesRequest.send(JSON.stringify(requestData.body));
//   });
// }