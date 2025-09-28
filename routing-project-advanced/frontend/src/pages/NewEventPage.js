import { redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function NewEventPage(){
    return (
        <>
            {/* <h1>New Event</h1> */}
            <EventForm />
        </>
    );
}

export async function createEvent({request, params}){
    const form_data = await request.formData();
    const newEventData = Object.fromEntries(form_data.entries());

    const response = await fetch("http://localhost:8080/events", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(newEventData)
    });

    if(!response.ok){
        throw new Response(JSON.stringify({message: "Unable to add new Event."}, {status: 500}));
    }

    return redirect("/events");//this function does the same as the function that useNavigation() hook returns. This function is provided to be used when t=we are unable to use hooks like now
}