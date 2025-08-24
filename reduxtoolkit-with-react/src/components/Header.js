import classes from './Header.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';

const Header = () => {

  const authenticated = useSelector(state => state.authSlice.authenticated);
  const dispatchLoggin = useDispatch();

  function handleLogout(){
    dispatchLoggin(authActions.loggedOut());
  }

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>
        <ul>
          <li>
            <a href='/'>My Products</a>
          </li>
          <li>
            <a href='/'>My Sales</a>
          </li>
          {authenticated && <li><button onClick={handleLogout}>Logout</button></li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
