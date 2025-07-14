import Places from './Places.jsx';
import Error from './Error.jsx';
import { useEffect, useState } from 'react';

import errorLibrary from "../data/errorLibrary.json";

export default function AvailablePlaces({ onSelectPlace }) {

  const [isLoading, setLoadingState] = useState(true);
  const [error, setError] = useState(undefined);
  const [AVAILABLE_PLACES, setAvailablePlaces] = useState([]);

  useEffect(()=>{
    (async function fetchAvailablePlaces(){
      const response = await fetch("http://localhost:3000/places").catch(()=>{setError(errorLibrary.networkError)});
      const responseData = await response.json();
      if(response.ok){
        setAvailablePlaces(responseData.places);
      }
      else{
        setError(responseData.message);
      }
      setLoadingState(false);
    })();//execute immediately

  },[])

  return (
    <>
      {error && <Error title="Error Loading Places" message={error}/>}
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