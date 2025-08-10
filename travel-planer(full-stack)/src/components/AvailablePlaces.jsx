import { useContext } from 'react';

import { selectedPlacesContext } from '../store/selectedPlacesContext.js';

import Places from './Places.jsx';
import {Error as ErrorComp} from './Error.jsx';
// import errorLibrary from "../data/errorLibrary.json";
import { fetchAvailablePlaces} from '../http.js';
import {sortPlacesByDistance} from "../loc.js";
import { useFetch } from '../customHooks/useFetch.js';

async function fetchSortedPlaces(){
  const places = await fetchAvailablePlaces();

  return new Promise((resolve)=>{
    if(navigator.onLine){
      navigator.geolocation.getCurrentPosition((location)=>{
          let userLat = location.coords.latitude;
          let userLon = location.coords.longitude;

          resolve(sortPlacesByDistance(places, userLat, userLon));
      });
    }
    else{
      resolve(places);
    }
  });
}

export default function AvailablePlaces() {

  //used my custom hook that helps handle all the operations and states surrounding fetching data from backend
  const {isLoading, error, fetchedData: availablePlaces } = useFetch(fetchSortedPlaces, []);

  const {addSelectedPlace} = useContext(selectedPlacesContext);

  return (
    <>
      {error && <ErrorComp title="Error Loading Places" message={error}/>}
      {!error && <Places
        title="Available Places"
        places={availablePlaces}
        fallbackText="No places available."
        isLoading={isLoading}
        loadingText="Loading places. Plaease Wait..."
        onSelectPlace={addSelectedPlace}
      />}
    </>
  );
}