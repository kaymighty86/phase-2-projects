import { useRouteLoaderData } from "react-router-dom";

import EventItem from "../components/EventItem";

export default function EventDetailPage(){

    // const data = useLoaderData();//this will get the loader data returned in this path before this page was loaded
    const data = useRouteLoaderData("event-details");//this will get the loader data returned in the given path via the ID inputed in the hook

    return (
        <>
            <EventItem event={data.event}/>
        </>
    );
}

export async function loader({request, params}){
    const response = await fetch(`http://localhost:8080/events/${params.eventId}`);

    if(!response.ok){
        throw new Response(JSON.stringify({message: "unable to load this event's information."}),{status: 500})
    }

    return response;
}