import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to='/login'>Login page</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
