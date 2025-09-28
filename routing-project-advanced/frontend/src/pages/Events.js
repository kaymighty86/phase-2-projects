// import { useEffect, useState } from 'react';

import EventsList from '../components/EventsList';
import { useLoaderData } from 'react-router-dom';

function EventsPage() {

  const data = useLoaderData();//when the data returned by the loader() function is a "Response" object, the useLoaderData() hook is able to automatically extract the data of the "Response" object. (The same thing as calling the "json()" function to extract data returned from backend)

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        {/* {error && <p>{error}</p>} */}
      </div>
      <EventsList events={data.events} />
    </>
  );
}

export default EventsPage;

export async function loader(){
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw new Response(JSON.stringify({message: "Unable to load events."}),{status: 500});
  }

  return response;
}
