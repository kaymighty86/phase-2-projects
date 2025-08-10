import { useContext, useState, useRef } from "react";
import { selectedPlacesContext } from "../store/selectedPlacesContext.js";

import Places from "./Places";
import { Error as ErrorComp } from "./Error";
import Modal from "./Modal";
import DeleteConfirmation from "./DeleteConfirmation";


export default function SelectedPlaces(){

    const {selectedPlaces, isLoading, error, clearError, deleteSelectedPlace} = useContext(selectedPlacesContext);

    const selectedPlace = useRef();
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

    function handleStartRemovePlace(place) {//for opening the delete confirmation modal
        selectedPlace.current = place;
        setDeleteModalIsOpen(true);
    }

    function handleStopRemovePlace() {//for closing the delete confirmation modal
        setDeleteModalIsOpen(false);
    }
    
    function handleRemovePlace() {
        deleteSelectedPlace(selectedPlace.current);
        setDeleteModalIsOpen(false);
    }

    return (
        <>
            {error && <Modal open={true} onClose={clearError}>
                        <ErrorComp title="Error Encountered :(" message={error} onConfirm={clearError}/>
                    </Modal>}
            
            <Modal open={deleteModalIsOpen} onClose={handleStopRemovePlace}>
                <DeleteConfirmation onCancel={handleStopRemovePlace} onConfirm={handleRemovePlace} />
            </Modal>

            <Places
                title="I'd like to visit ..."
                fallbackText="Select the places you would like to visit below."
                places={selectedPlaces}
                isLoading={isLoading}
                loadingText="Loading places. Plaease Wait..."
                onSelectPlace={handleStartRemovePlace}
            />
        </>
    );
}