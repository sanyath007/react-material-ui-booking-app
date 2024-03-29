import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import { LogOut as LogOutIcon } from 'react-feather';
import NavItem from './NavItem';
import LogoutNavItem from './LogoutNavItem';
import items from './_nav';
import useStyles from './styles';

const user = {
  avatar: `${process.env.PUBLIC_URL}/static/images/avatars/avatar_3.png`,
  jobTitle: 'Senior Developer',
  name: 'Kobe Jr'
};

const NavBar = ({ onMobileClose, openMobile, loggedInUser }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {loggedInUser?.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {loggedInUser?.position}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.filter((item) => item.permission.includes(parseInt(loggedInUser?.role, 10)))
            .map((item) => {
              return (
                <NavItem
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
              );
            })}

          {openMobile && (
            <LogoutNavItem
              key="Logout"
              title="Logout"
              icon={LogOutIcon}
            />
          )}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
  loggedInUser: PropTypes.object
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
