import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Fade,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const OverflowMenu = ({ items, onSelected }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-label="settings" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {items && items.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => {
              handleClose();
              onSelected(item.id);
            }}
          >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

OverflowMenu.propTypes = {
  items: PropTypes.array,
  onSelected: PropTypes.func
};

export default OverflowMenu;
