import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import {
  Box,
  Button as MuiButton,
  makeStyles
} from '@material-ui/core';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { bookingActions } from '../../../redux';

const useStyles = makeStyles((theme) => ({
  root: {},
  dischargeButton: {
    marginRight: theme.spacing(1),
    color: theme.palette.error.contrastText,
    background: theme.palette.success.dark,
    '&:hover': {
      background: theme.palette.success.main
    }
  },
  cancelButton: {
    marginRight: theme.spacing(1),
    color: theme.palette.error.contrastText,
    background: theme.palette.error.dark,
    '&:hover': {
      background: theme.palette.error.main
    }
  }
}));

const Toolbar = ({ className, booking, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancelClick = (_id) => {
    if (window.confirm(`คุณต้องการยกเลิกการจองห้องพิเศษรหัส ${_id} ใช่หรือไม่ ?`)) {
      console.log(_id);

      dispatch(bookingActions.cancel(_id, navigate));
    }
  };

  const handleDischargeClick = (_id, ipAn) => {
    if (window.confirm(`คุณต้องการจำหน่ายผู้ป่วย AN ${ipAn} ใช่หรือไม่ ?`)) {
      console.log(_id);

      dispatch(bookingActions.discharge(_id, navigate));
    }
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
      style={{ marginBottom: '20px' }}
    >
      <Box display="flex" justifyContent="flex-end">
        <MuiButton
          className={classes.dischargeButton}
          variant="contained"
          onClick={() => handleDischargeClick(booking.book_id, booking?.ip?.an)}
          endIcon={<MeetingRoomIcon />}
        >
          จำหน่าย
        </MuiButton>
        <MuiButton
          className={classes.cancelButton}
          variant="contained"
          onClick={() => handleCancelClick(booking.book_id)}
          endIcon={<EventBusyIcon />}
        >
          ยกเลิกจองห้อง
        </MuiButton>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  booking: PropTypes.object
};

export default Toolbar;
