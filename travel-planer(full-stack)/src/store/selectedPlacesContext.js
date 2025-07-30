import { createContext} from "react";

export const selectedPlacesContext = createContext({
    selectedPlaces: [],
    addSelectedPlace(placeData = {}){},
    deleteSelectedPlace(placeData = {}){},
    isLoading: false,
    error: undefined,
    clearError(){}
});
