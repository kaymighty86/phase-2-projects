import { useRef, useState, useCallback } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';

import {updateUserPlaces} from "./http.js";

function App() {
  const selectedPlace = useRef();

  const [isLoading, setLoadingState] = useState(true);
  const [error, setError] = useState(undefined);
  const [userPlaces, setUserPlaces] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    if (!userPlaces.some((place) => place.id === selectedPlace.id)) {//if the selected place does not exist before in the list of selected places
      //UPDATE LOCALLY BUT INITIALISE THE SYNCH STATUS
      const newPlace = {...selectedPlace, synched: false};
      setUserPlaces((prevPickedPlaces) => ([newPlace, ...prevPickedPlaces]));
      
      //UPDATE AT THE BACKEND
      try{
        //remove the "synched" prop from the objects before sending to the backend
        const modifiedUserPlaces = userPlaces.map(place => {
          let nPlace = {...place};
          delete nPlace.synched;
          return nPlace;
        });

        const updated = await updateUserPlaces([selectedPlace, ...modifiedUserPlaces]);//send
        
        if(updated){//if data was succesfully updated, update the synched status of the place locally
          setUserPlaces((prevPickedPlaces) => {
            return [...prevPickedPlaces].map(place => {
                if(place.id == selectedPlace.id){
                  return {...place, synched: true};
                }
                return place;
              })
          });
        }
      }
      catch(error){
        setError("Error updating selected places. " + error)
        setUserPlaces(userPlaces);//reverse to previous state
      }
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    setModalIsOpen(false);
  }, []);

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
