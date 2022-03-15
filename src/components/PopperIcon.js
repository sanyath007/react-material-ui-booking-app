import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Fade,
  Icon,
  Paper,
  Popper
} from '@material-ui/core';

const PopperIcon = ({ icon, iconColor, children }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [placement, setPlacement] = useState();

  const handleClick = (newPlacement) => (e) => {
    setAnchorEl(e.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <div>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
        modifiers={{
          offset: {
            enabled: true,
            offset: '0, 15'
          }
        }}
      >
        {({ TransitionProps }) => {
          return (
            <Fade {...TransitionProps} timeout={350}>
              <Paper style={{ backgroundColor: '#ffeead' }}>{children}</Paper>
            </Fade>
          );
        }}
      </Popper>
      <Box>
        <a href="#" onClick={handleClick('top')}>
          <Icon color={iconColor}>{icon}</Icon>
        </a>
      </Box>
    </div>
  );
};

PopperIcon.propTypes = {
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  children: PropTypes.any
};

export default PopperIcon;
