import React from 'react';
import { Navigate } from 'react-router-dom';
import isAuthExpired from '../utils/auth';

const withAuth = (WrappedComponent) => {
  return (props) => {
    console.log('on withAuth process...');
    if (!isAuthExpired()) {
      return <WrappedComponent {...props} />;
    }

    return <Navigate to="/login" />;
  };
};

export default withAuth;
