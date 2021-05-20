import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import Swal from 'sweetalert2';
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
  const { auth } = useSelector((state) => state.auth);

  const handleCancelClick = (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `คุณต้องการยกเลิกการจองห้องพิเศษรหัส ${_id} ใช่หรือไม่ ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(bookingActions.cancel(_id, navigate));
      }
    });
  };

  const handleDischargeClick = (_id, _an) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `คุณต้องการจำหน่ายผู้ป่วย AN ${_an} ใช่หรือไม่ ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(bookingActions.discharge(_id, navigate));
      }
    });
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
      style={{ marginBottom: '20px' }}
    >
      <Box display="flex" justifyContent="flex-end">
        {[1, 2].includes(parseInt(auth.role, 10)) && (
          <MuiButton
            className={classes.dischargeButton}
            variant="contained"
            onClick={() => handleDischargeClick(booking.book_id, booking?.ip?.an)}
            endIcon={<MeetingRoomIcon />}
          >
            จำหน่าย
          </MuiButton>
        )}
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
