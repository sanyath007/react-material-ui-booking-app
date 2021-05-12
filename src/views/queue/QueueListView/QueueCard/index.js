import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Typography
} from '@material-ui/core';
import moment from 'moment';

import useStyles from './styles';

const QueueCard = ({ booking, queue }) => {
  const classes = useStyles();

  const renderSuffix = (no) => {
    let suffix = '';
    if (no.toString().endsWith(1)) {
      suffix = 'st';
    } else if (no.toString().endsWith(2)) {
      suffix = 'nd';
    } else {
      suffix = 'th';
    }

    return suffix;
  };

  return (
    <Card className={classes.queueCard}>
      <div className={classes.queueNo}>
        <h2>
          {queue}
          <sup style={{ fontSize: '18px' }}>
            {renderSuffix(queue)}
          </sup>
        </h2>
      </div>
      <Typography variant="h4">
        {`${booking.ip.patient.pname}${booking.ip.patient.fname} ${booking.ip.patient.lname}`}
      </Typography>
      <Typography variant="subtitle1">
        {`HN ${booking.ip.hn} AN ${booking.ip.an}`}
      </Typography>
      <Typography variant="subtitle1">
        {`วันที่จอง ${moment(booking.book_date).format('DD/MM/YYYY')}`}
      </Typography>
    </Card>
  );
};

QueueCard.propTypes = {
  booking: PropTypes.object,
  queue: PropTypes.number
};

export default QueueCard;
