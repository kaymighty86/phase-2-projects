// import { useEffect, useState } from 'react';

import { Suspense } from 'react';
import EventsList from '../components/EventsList';
import { useLoaderData, Await } from 'react-router-dom';

function EventsPage() {

  // const data = useLoaderData();//when the data returned by the loader() function is a "Response" object, the useLoaderData() hook is able to automatically extract the data of the "Response" object. (The same thing as calling the "json()" function to extract data returned from backend)
  const returnedObject = useLoaderData();//when the data returned by the loader() function is a "Response" object, the useLoaderData() hook is able to automatically extract the data of the "Response" object. (The same thing as calling the "json()" function to extract data returned from backend)

  return (
    <>
      <Suspense fallback={<p style={{textAlign: "center"}}>Loading...</p>}>
        <Await resolve={returnedObject.event}>
          {(loadedData)=>(
            <EventsList events={loadedData.events} />
            )}
        </Await>
      </Suspense>
    </>
  );
}

export default EventsPage;

async function loadEvents(){
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw new Response(JSON.stringify({message: "Unable to load events."}),{status: 500});
  }

  const data = await response.json();

  return data;
}

export function loader(){
  //instead of waiting for the promise to resolve before the page loads, we are choosing to return an object of the returned promises of the loader functions (remember the async function returns a promise when its executed) and allow the page load while the promise is resolving and wait for it there in that page
  return {
    event: loadEvents()//this will return an unresolved Promise since its an async function
    //this object can contain multiple async functions, for this project we are only returning one because thats all we need
  }
}
