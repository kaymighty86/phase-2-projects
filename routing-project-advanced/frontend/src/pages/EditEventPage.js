import EventForm from "../components/EventForm";

import { useRouteLoaderData } from "react-router-dom";

export default function EditEventPage(){

    const currentEvent = useRouteLoaderData("event-details");

    return (
        <EventForm event={currentEvent.event}/>
    );
}