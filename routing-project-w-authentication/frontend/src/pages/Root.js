import { Outlet, useLoaderData, useSubmit, useNavigation } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenDuration } from '../util/authUtils';

function RootLayout() {
  // const navigation = useNavigation();
  const submit = useSubmit();
  const token = useLoaderData();

  useEffect(()=>{
    if(token){//if a token exists
      //if the token has exceeded its lifespan, its expired and must have been deleted at the backend already 
      setTimeout(()=>{
        submit(null,{action: "/logout", method: "POST"});
      }, getTokenDuration());
    }
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
