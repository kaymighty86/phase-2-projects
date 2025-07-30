import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import SelectedPlaces from './components/SelectedPlaces.jsx';

import SelectedPlacesContextProvider from './store/SelectedPlacesContextProvider.jsx';

function App() {

  return (
    <>
      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <SelectedPlacesContextProvider>
          <SelectedPlaces />
          <AvailablePlaces />
        </SelectedPlacesContextProvider>
      </main>
    </>
  );
}

export default App;
