import PlaceDummy from "./PlaceDummy";

export default function Place({placeData, onSelectPlace}){
    const backendSynched = (placeData.synched == undefined || placeData.synched == true)? true : false; //if a backend synch-status prop is provided with the place data, check the status and show the state on the UI, else just default to synchState = true
    return (
        <>   
            {backendSynched? 
                <li className="place-item">
                    <button onClick={() => onSelectPlace(placeData)}>
                    <img src={`http://localhost:3000/${placeData.image.src}`} alt={placeData.image.alt} />
                    <h3>{placeData.title}</h3>
                    </button>
                </li> 
                : <PlaceDummy />
            }
        </>
    );
}