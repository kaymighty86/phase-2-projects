import { useEffect, useState } from "react";

export function useFetch(fetchFn, defaultStateValue){

    const [isLoading, setLoadingState] = useState(true);
    const [error, setError] = useState(undefined);
    const [fetchedData, setFetchedData] = useState(defaultStateValue);

    useEffect(()=>{
        (async function loadAvailablePlaces(){
            try{
                const data = await fetchFn();
                setFetchedData(data);
                setLoadingState(false);
            }
            catch(error){
                setError(error.toString());
                setLoadingState(false);
            }
        })();//execute immediately
    },[])

    return {
        isLoading,
        error,
        setError,
        fetchedData,
        setFetchedData,
    }
}