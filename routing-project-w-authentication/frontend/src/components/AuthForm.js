import { Form, Link, useSearchParams, useActionData } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {

  const [searchParams, setSearchParams] = useSearchParams();//this hook allows us get search parameters from the URL (ps. Javascript has a "URL" objet that has a function that can also do the same thing)
  const mode = searchParams.get("mode") || "login";//if no mode is specified in the search params, then put the page in "login" mode
  const isLogin = mode === "login";

  const redirectURL = searchParams.get("redirect");

  let data = useActionData();
  // if(data) data = JSON.parse(data);

  return (
    <>
      <Form method="post" className={classes.form}>
        {data && data.errors && 
          <ul>
            {
              Object.values(data.errors).map(error => 
                <li>{error}</li>
              )
            }
          </ul>}
        {data && data.message && <p>{data.message}</p>}
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin? "signup" : "login"}${redirectURL != null? `&redirect=${redirectURL}`:""}`}>
            {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
          </Link>
          <button>{isLogin? "Login" : "Sign Up"}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
