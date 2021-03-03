import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from './styles';

const BedCard = ({ className, room, ...rest }) => {
  const classes = useStyles();
  const bookingRoom = { ...room.booking_room };
  const booking = { ...bookingRoom.booking };
  const ipData = { ...booking.an };
  const patient = { ...ipData.patient };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        avatar={(
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        )}
        action={(
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        )}
        title={room.room_name}
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image={room.room_img_url ? room.room_img_url : '/static/images/products/product_5.png'}
        title={room.room_name}
      />
      <CardContent>
        <span>
          {`HN : ${ipData.hn} `}
        </span>
        <span>
          {`AN : ${ipData.an}`}
        </span>
        <p>
          {`ผู้ป่วย : ${patient.pname}${patient.fname} ${patient.lname}`}
        </p>
        <p>
          {`วันที่ Admit : ${ipData.regdate}`}
        </p>
        <p>
          {`วันที่ย้ายเข้า : ${bookingRoom.checkin_date}`}
        </p>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon
              className={classes.statsIcon}
              color="action"
            />
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              Updated 2hr ago
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <GetAppIcon
              className={classes.statsIcon}
              color="action"
            />
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {room.totalDownloads}
              {' '}
              Checkout
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

BedCard.propTypes = {
  className: PropTypes.string,
  room: PropTypes.object.isRequired
};

export default BedCard;
