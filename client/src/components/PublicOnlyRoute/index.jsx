import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicOnlyRoute = (props) => {
  const { user, isLoading, error } = useSelector((state) => state.auth);

  if (isLoading) {
    return <div>LOADING ...</div>;
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return <Route {...props} />;
};

export default PublicOnlyRoute;
