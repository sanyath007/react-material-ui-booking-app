import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  bookingCard: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0 10px',
  },
  patientCard: {
    background: '#2E94B9',
    borderRadius: '10px',
    width: '30vw',
    height: '150px',
    position: 'absolute',
    margin: '20px 0',
    padding: '10px',
    color: '#ffffff'
  },
  bookingContent: {
    background: '#ffffff',
    width: '100vw',
    height: '150px',
    borderRadius: '10px',
    boxShadow: '0 0 0 1px rgb(63 63 68 / 5%), 0 1px 2px 0 rgb(63 63 68 / 15%)',
    margin: '20px 0',
    padding: '10px'
  },
  content: {
    marginLeft: '42%',
    padding: '10px',
  },
  avatar: {
    height: 100,
    width: 100,
    margin: 'auto auto'
  },
  textProperty: {
    color: theme.palette.text.secondary
  }
}));

const BookingCard = ({ booking }) => {
  const classes = useStyles();

  return (
    <div className={classes.bookingCard}>
      <div className={classes.patientCard}>
        <Grid
          container
          spacing={3}
          style={{ margin: 'auto 0' }}
        >
          <Grid item>
            <Avatar
              className={classes.avatar}
              src="/static/images/avatars/avatar_8.png"
            />
          </Grid>
          <Grid item>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h3">Patient Name</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{`Age ${'99'}`}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{`Tel. ${'09-9999999'}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={classes.bookingContent}>
        <div className={classes.content}>
          <Grid container direction="row" spacing={2}>
            <Grid item md={3}>
              <Typography variant="subtitle2" className={classes.textProperty}>AN</Typography>
              <Typography variant="h4">{booking.an}</Typography>
            </Grid>
            <Grid item md={3}>
              <Typography variant="subtitle2" className={classes.textProperty}>HN</Typography>
              <Typography variant="h4">{booking.hn}</Typography>
            </Grid>
            <Grid item md={6}>
              <Typography variant="subtitle2" className={classes.textProperty}>สิทธิ์การรักษา</Typography>
              <Typography variant="h4">999-xxxxxxxx</Typography>
            </Grid>
            <Grid item md={3}>
              <Typography variant="subtitle2" className={classes.textProperty}>วันที่ Admit</Typography>
              <Typography variant="h4">
                {moment().format('DD/MM/YYYY')}
              </Typography>
            </Grid>
            <Grid item md={3}>
              <Typography variant="subtitle2" className={classes.textProperty}>เวลา</Typography>
              <Typography variant="h4">
                {moment().format('hh:mm')}
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography variant="subtitle2" className={classes.textProperty}>วอร์ด</Typography>
              <Typography variant="h4">99-xxxxxxxx</Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

BookingCard.propTypes = {
  booking: PropTypes.object
};

export default BookingCard;
