import Counter from './components/Counter';
import Auth from "./components/Auth";
import UserProfile from "./components/UserProfile";
import Header from "./components/Header"

import { useSelector } from 'react-redux';

function App() {

  const authenticated = useSelector(state => state.authSlice.authenticated);

  return (
    <>
      <Header />
      {!authenticated? <Auth /> : <UserProfile />}
      <Counter />
    </>
  );
}

export default App;
