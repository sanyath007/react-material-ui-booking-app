import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import TopBar from './TopBar';
import useStyles from './styles';
import isAuthExpired from '../../utils/auth';

const DashboardLayout = () => {
  const classes = useStyles();
  const { auth } = useSelector((state) => state.auth);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const redirectTo = () => {
    if (isAuthExpired()) {
      localStorage.removeItem('access_token');
    }

    return <Navigate to="/login" />;
  };

  return (
    <>
      {!isAuthExpired()
        ? (
          <div className={classes.root}>
            <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} isLoggedIn={auth !== null} />

            <NavBar
              onMobileClose={() => setMobileNavOpen(false)}
              openMobile={isMobileNavOpen}
              loggedInUser={auth}
            />

            <div className={classes.wrapper}>
              <div className={classes.contentContainer}>
                <div className={classes.content}>
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        ) : redirectTo()}
    </>
  );
};

export default DashboardLayout;
