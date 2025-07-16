import { useEffect, useState } from 'react';

import Places from './Places.jsx';
import {Error as ErrorComp} from './Error.jsx';
import errorLibrary from "../data/errorLibrary.json";
import { fetchAvailablePlaces} from '../http.js';
import {sortPlacesByDistance} from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {

  const [isLoading, setLoadingState] = useState(true);
  const [error, setError] = useState(undefined);
  const [AVAILABLE_PLACES, setAvailablePlaces] = useState([]);

  useEffect(()=>{
    (async function loadAvailablePlaces(){
      try{
        // const as = 23 * ab;
        const places = await fetchAvailablePlaces();

        //get the user's geo location becuase we want to sort the places based on distance to player
        navigator.geolocation.getCurrentPosition((location)=>{
          let userLat = location.coords.latitude;
          let userLon = location.coords.longitude;

          setAvailablePlaces(sortPlacesByDistance(places, userLat, userLon));
          setLoadingState(false);
        }, (error)=>{
          throw new Error(errorLibrary.locationError);
        });
      }
      catch(error){
        setError(error);
        setLoadingState(false);
      }
    })();//execute immediately

  },[])

  return (
    <>
      {error && <ErrorComp title="Error Loading Places" message={error}/>}
      {!error && <Places
        title="Available Places"
        places={AVAILABLE_PLACES}
        fallbackText="No places available."
        isLoading={isLoading}
        loadingText="Loading places. Plaease Wait..."
        onSelectPlace={onSelectPlace}
      />}
    </>
  );
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