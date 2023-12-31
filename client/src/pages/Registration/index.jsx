import React from 'react';
import Header from '../../components/Header';
import RegistrationForm from '../../components/RegistrationForm';

const RegistrationPage = (props) => {
  return (
    <div>
      <Header />
      <h1>Register now</h1>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
