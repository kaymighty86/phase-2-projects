import { redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { setAuthToken } from '../util/authUtils';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function signinAction({request}){
  const data = await request.formData();

  const searchParams = new URL(request.url).searchParams;//this is the default javascript method of getting search parameters from a URL (in this case the URL passed by the form)
  const mode = searchParams.get("mode") || "login";//if no mode is specified in the search params, then put the page in "login" mode
  const isLogin = mode === "login";

  const userCredentials = {
    email: data.get("email"),
    password: data.get("password"),
  }

  const response = await fetch(`http://localhost:8080/${isLogin? "login" : "signup"}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userCredentials)
    }
  );

  //check if the backend says there a data validation issue
  if(response.status === 422 || response.status === 401){
    return response;
  }

  if(!response.ok){
    throw new Response({"message": "Unable to handle the sign in request. Contact admin."}, {status: 500});
  }

  //if we get to this point, then all went well. We must have gotten a session token from the backend
  const resData = await response.json();
  setAuthToken(resData.token);//save the token in local memory

  const redirectURL = searchParams.get("redirect");//if the login page was navigated to by another page to request loggin in, then they must have appended the URL of that page as a search parameter
  
  return redirect(redirectURL || "/");//redirect to the redirect url if any is given, else go home
}