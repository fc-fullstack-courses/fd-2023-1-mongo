import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';

const HomePage = (props) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <Header />
      <h1>Hello {user ? `${user.firstName} ${user.lastName}` : 'Guest'}</h1>
    </div>
  );
};

export default HomePage;
