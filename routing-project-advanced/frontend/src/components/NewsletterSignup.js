import { useEffect } from 'react';
import classes from './NewsletterSignup.module.css';
import { useFetcher } from 'react-router-dom';

function NewsletterSignup() {

  const fetcher = useFetcher();//this hook provies a fetcher object that helps up fetch action and loader from another route to use without triggering navigation into those routes (which is what the normal method of inputting the action path will do).
  const {data: actionData, state} = fetcher;//the fetcher provides all that we need when triggering an action/loader of another route e.g. the action data returned, the navigation state, etc. These are thing we would have been unabe to do unless we navigate to the route

  //we'll use useEffect to do something whenever the action is triggered 
  useEffect(()=>{
    if(state == "idle" && actionData){//once the state is idle (i.e. the action is done executing) and we have a data returned by the action that was triggered
      window.alert(actionData.message);//the action data contains an object that we returned in the action function
    }
  }, [actionData, state]);

  return (
    <fetcher.Form method="post" action="/newsletter" className={classes.newsletter}> {/*it also provides us another custom Form component to use in place of the normal Form provided by React Router, this form will not trigger a navigation change when we choose to trigger an action in another route*/}
      <input
        type="email"
        name="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>{state == "loading"? "Please wait..." : "Sign up"}</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
