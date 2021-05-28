import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Box,
  Button as MuiButton,
  Card,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment';
import useStyles from './styles';

const QueueCard = ({
  booking,
  queue,
  onQueue,
  slotCount,
  handleSkipOnQueue
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state.auth);

  const renderSuffix = (no) => {
    let suffix = '';
    if (no.toString().endsWith(1)) {
      suffix = 'st';
    } else if (no.toString().endsWith(2)) {
      suffix = 'nd';
    } else if (no.toString().endsWith(3)) {
      suffix = 'rd';
    } else {
      suffix = 'th';
    }

    return (
      <div className={classes.queueNo}>
        <h2>
          {no}
          <sup style={{ fontSize: '18px' }}>
            {suffix}
          </sup>
        </h2>
      </div>
    );
  };

  const renderBtnActions = (q) => {
    return [1, 2].includes(parseInt(auth.role, 10)) && q === onQueue && (
      <Box p={2} style={{ textAlign: 'center' }}>
        {q !== 1 && (
          <MuiButton
            variant="contained"
            color="secondary"
            onClick={() => handleSkipOnQueue(-1)}
            style={{ marginRight: '8px' }}
          >
            <ArrowBackIosIcon />
          </MuiButton>
        )}

        <Link
          to={`/app/checkin/${booking.book_id}`}
          className={classes.checkinButton}
          onClick={(e) => {
            if (booking?.ip?.dchdate) {
              e.preventDefault();

              window.alert('ผู้ป่วยถูกจำหน่ายแล้วไม่สามารถรับเข้าห้องได้ กรุณาจำหน่ายผู้ป่วยออกจากระบบ!!!');
              navigate(`/app/bookings/${booking.book_id}/detail`);
            }

            return true;
          }}
        >
          <MuiButton variant="contained" color="primary" endIcon={<ExitToAppIcon />}>
            รับเข้าห้อง
          </MuiButton>
        </Link>

        {q !== slotCount && (
          <MuiButton
            variant="contained"
            color="secondary"
            onClick={() => handleSkipOnQueue(1)}
          >
            <ArrowForwardIosIcon />
          </MuiButton>
        )}
      </Box>
    );
  };

  return (
    <Card>
      <CardContent className={classes.queueCard}>
        {renderSuffix(queue)}

        <Typography variant="h4">
          {`${booking.ip.patient.pname}${booking.ip.patient.fname} ${booking.ip.patient.lname}`}
        </Typography>
        <Typography variant="subtitle1">
          {`HN ${booking.ip.hn} | AN ${booking.ip.an}`}
        </Typography>
        <Typography variant="subtitle1">
          <span>วันที่จอง</span>
          <span className={classes.textVal}>
            {moment(booking.book_date).format('DD/MM/YYYY')}
          </span>
        </Typography>
        <Typography variant="subtitle1">
          <span>วอร์ด</span>
          <span className={classes.textVal}>{booking?.ip?.ward?.name}</span>
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />

      {renderBtnActions(queue)}
    </Card>
  );
};

QueueCard.propTypes = {
  booking: PropTypes.object,
  queue: PropTypes.number,
  onQueue: PropTypes.number,
  slotCount: PropTypes.number,
  handleSkipOnQueue: PropTypes.func
};

export default QueueCard;
