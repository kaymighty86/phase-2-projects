import { useNavigate, Form, useNavigation, useActionData, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

export default function EventForm({ method = "POST", event }) {
  const navigate = useNavigate();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const actionData = useActionData();//when input validation error is received from the backend by which ever page is using this, the action function here will return the response data itself, capture the response from the closest action function on this route
  const errors = actionData && Object.values(actionData.errors).map(errMessage => <li key={errMessage}>{errMessage}</li>);//lets use the "values()" function of the Object class to extract all the values of the props in the errors prop of the response object's data into an array of values


  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {actionData && <ul>{errors}</ul>}

      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title"  defaultValue= {event? event.title : ""} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image"  defaultValue={event? event.image : ""}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date"  defaultValue={event? event.date : ""}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5"  defaultValue = {event? event.description : ""} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled = {isSubmitting}>{isSubmitting? "Saving..." : "Save"}</button>
      </div>
    </Form>
  );
}

//this action function is used by both the new event page and the edit event page routes as their actions
export async function eventAction({request, params}){
    const form_data = await request.formData();
    const newEventData = Object.fromEntries(form_data.entries());

    let url = "http://localhost:8080/events";//by default we should be adding new event
    if(request.method === "PATCH"){//if the PATCH method is passed, then we're updating an existing event, append the URL with the event Id
      url += "/"+params.eventId;
    }

    const response = await fetch(url, {
        method: request.method,
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(newEventData)
    });

    if(response.status === 422){//if we got a validation error, return the response object as it is.
        return response;
    }

    if(!response.ok){
        throw new Response(JSON.stringify({message: "Unable to add new Event."}, {status: 500}));
    }

    return redirect("/events");//this is a response-type function that does the same as the function that useNavigation() hook returns. This function is provided to be used in an action function since we are unable to use hooks here
}