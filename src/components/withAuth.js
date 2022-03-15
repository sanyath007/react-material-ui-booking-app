import React from 'react';
import { Navigate } from 'react-router-dom';
import isAuthExpired from '../utils/auth';

const withAuth = (WrappedComponent) => {
  return (props) => {
    console.log('on withAuth process...');
    if (!isAuthExpired()) {
      return <WrappedComponent {...props} />;
    }

    localStorage.removeItem('access_token');

    return <Navigate to="/viproom/login" />;
  };
};

export default withAuth;
