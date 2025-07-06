import Places from './Places.jsx';
import { useEffect, useState } from 'react';

export default function AvailablePlaces({ onSelectPlace }) {

  const [AVAILABLE_PLACES, setAvailablePlaces] = useState([]);

  useEffect(()=>{

    (async function fetchAvailablePlaces(){
      const response = await fetch("http://localhost:3000/places");
      const responseData = await response.json();
      setAvailablePlaces(responseData.places);
    })();//execute immediately

  },[])

  return (
    <Places
      title="Available Places"
      places={AVAILABLE_PLACES}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
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