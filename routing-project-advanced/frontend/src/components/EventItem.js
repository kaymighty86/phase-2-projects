import classes from './EventItem.module.css';
import { Link, redirect, useSubmit } from 'react-router-dom';

export default function EventItem({ event }) {

  const submit = useSubmit();//this function provided by this hook is used to programatically trigger a route's action

  function startDeleteHandler() {
    const confirmDelete = window.confirm("Do you really want to delete this event?");

    if(confirmDelete){
      submit(null,{method: "DELETE"});//this takes two objects as parameters, first object should contain the data that should be passed to the "request" prop of the action function,(it wraps it in a FormData object before sending), the second object should contain the form metadata (basically the attributes of a form like "method" (POST, GET, DELETE), "action" (which can contain the path to the route of an external action to trigger, same you can do in a form))
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export async function deleteEvent({request, params}){
  const response = await fetch(`http://localhost:8080/events/${params.eventId}`,{
    method: request.method,//we're programmatically invokig this action function so a method was passed via the "request" prop
    header: {
      "Content-Type":"application/json"
    }
  });

  if(!response.ok){
    throw new Response({message: "Unable to delete event."}, {status: 500});
  }

  return redirect("/events");
}