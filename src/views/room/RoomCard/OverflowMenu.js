import React, { useState } from 'react';
import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList
} from '@material-ui/core';

const OverflowMenu = ({ anchorRef }) => {
  const [open, setOpen] = useState(false);

  const handleClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow
          { ...TransitionProps }
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={open}>
                <MenuItem onClick={handleClose}>ระงับการใช้งานชั่วคราว</MenuItem>
                <MenuItem onClick={handleClose}>ยกเลิกการใช้งาน</MenuItem>
                <MenuItem onClick={handleClose}>สถานะซ่อมบำรุง</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default OverflowMenu;
