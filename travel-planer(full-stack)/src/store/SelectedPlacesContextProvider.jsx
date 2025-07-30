import { selectedPlacesContext } from "./selectedPlacesContext.js";

import { useEffect, useState } from "react";
import { fetchSelectedPlaces, updateUserPlaces } from "../http";

export default function SelectedPlacesContextProvider({children}){

    const [isLoading, setLoadingState] = useState(true);
    const [error, setError] = useState(undefined);
    const [selectedPlaces, setSelectedPlaces] = useState([]);

    useEffect(()=>{
        //fetch selected places from backend
        (async function loadSelectedPlaces(){
            setLoadingState(true);

            try{
                let selectedPlaces = await fetchSelectedPlaces();
                setSelectedPlaces(selectedPlaces);
                setLoadingState(false);
            }
            catch(error){
                setError("Error fetching selected places: " + error);
                setLoadingState(false);
            }
        })();
    }, []);

    async function addSelectedPlace(selectedPlace) {
        if (!selectedPlaces.some((place) => place.id === selectedPlace.id)) {//if the selected place does not exist before in the list of selected places
            //UPDATE AT FRONTEND BUT INITIALISE THE SYNCH STATUS (to show that the change is not final)
            const newPlace = {...selectedPlace, synched: false};
            setSelectedPlaces((prevPickedPlaces) => ([newPlace, ...prevPickedPlaces]));
            
            //UPDATE AT THE BACKEND
            try{
                //remove the "synched" prop from the serPlace objects before sending to the backend
                const previousUserPlaces = selectedPlaces.map(place => {
                    let nPlace = {...place};
                    delete nPlace.synched;
                    return nPlace;
                });

                const updated = await updateUserPlaces([selectedPlace, ...previousUserPlaces]);//send
                
                if(updated){//if data was succesfully updated, update the synched status of the place locally
                    setSelectedPlaces((prevPickedPlaces) => {
                        return [...prevPickedPlaces].map(place => {
                            if(place.id == selectedPlace.id){
                            return {...place, synched: true};
                            }
                            return place;
                        })
                    });
                    
                    console.log("Selected places updated successfully")
                }
            }
            catch(error){
                setError("Error updating selected places. " + error)
                setSelectedPlaces(selectedPlaces);//reverse to previous state
            }
        }
    }

    async function deleteSelectedPlace(selectedPlace){
        //UPDATE AT FRONTEND
        setSelectedPlaces(prevSelectedPlaces => {
            return prevSelectedPlaces.filter(place => (place.id != selectedPlace.id)); //filter out all places except the one that was selected
        });

        //UPDATE AT BACKEND
        try{
            //remove the "synched" prop from the selectedPlace objects before sending to the backend
            const previousSelectedPlaces = selectedPlaces.map(place => {
                let nPlace = {...place};
                delete nPlace.synched;
                return nPlace;
            });

            const updated = await updateUserPlaces(previousSelectedPlaces.filter(place => (place.id != selectedPlace.id)));//send
            
            if(updated){//if data was succesfully updated, update the synched status of the place locally
                console.log("Selected places updated successfully")
            }
        }
        catch(error){
            setError("Error deleting selected places. " + error)
            setSelectedPlaces(selectedPlaces);//reverse to previous state
        }
    }

    function clearError(){
        setError(undefined);
    }

    const data = {
        selectedPlaces,
        addSelectedPlace,
        deleteSelectedPlace,
        isLoading,
        error,
        clearError
    }

    return (
        <selectedPlacesContext.Provider value={data}>
            {children}
        </selectedPlacesContext.Provider>
    );
}