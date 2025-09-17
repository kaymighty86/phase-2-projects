import { useLoaderData } from "react-router-dom";

import EventItem from "../components/EventItem";

export default function EventDetailPage(){

    const data = useLoaderData();

    return (
        <>
            <EventItem event={data.event}/>
        </>
    );
}

export async function loader({request, params}){
    const response = fetch(`http://localhost:8080/events/${params.eventId}`);

    if(!response.ok){
        //DISPLAY ERROR error fetching events
    }

    return response;
}