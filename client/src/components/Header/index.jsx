import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { clearTokens } from '../../api';

const Header = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    clearTokens();
    dispatch(logout());
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/login'>Login page</Link>
          </li>
          <li>
            <Link to='/registration'>Registration page</Link>
          </li>
          <li>
            <Link to='/chat'>Chat page</Link>
          </li>
        </ul>
      </nav>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
