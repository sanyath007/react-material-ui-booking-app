import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import moment from 'moment';
import calAge from '../../../utils';

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
    margin: '20px auto',
    borderRadius: '15px',
    boxShadow: '0 0 0 1px rgb(63 63 68 / 5%), 0 1px 2px 0 rgb(63 63 68 / 15%)',
  },
  patientCard: {
    background: theme.palette.error.main,
    borderRadius: '15px',
    width: '30vw',
    minHeight: '150px',
    position: 'relative',
    margin: '0',
    padding: '10px',
    color: '#ffffff'
  },
  bookingContent: {
    background: '#ffffff',
    minHeight: '150px',
    margin: '10px 0',
    padding: '10px',
  },
  content: {
    padding: '10px',
  },
  avatar: {
    height: 100,
    width: 100,
    margin: 'auto auto'
  },
  textProperty: {
    color: theme.palette.text.secondary
  },
  textPropertyValue: {
    color: '#525252'
  }
}));

const BookingCard = ({ booking }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.bookingCard} direction="row">
      {/* // TODO: separate patient card to own component */}
      <Grid item className={classes.patientCard} xs={12} sm={4} md={4}>
        <Grid
          container
          spacing={3}
          style={{ margin: 'auto 0' }}
        >
          <Grid item>
            <Avatar
              className={classes.avatar}
              src={
                booking?.ip?.patient?.sex === '1'
                  ? '/static/images/avatars/avatar_8.png'
                  : '/static/images/avatars/avatar_2.png'
              }
            />
          </Grid>
          <Grid item>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h4">
                  {`${booking?.ip?.patient?.pname}${booking?.ip?.patient?.fname} ${booking?.ip?.patient?.lname}`}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{`Age ${calAge(booking?.ip?.patient?.birthday)}`}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{`Tel. ${booking?.ip?.patient?.hometel}`}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{`CID ${booking?.ip?.patient?.cid}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.bookingContent} xs={12} sm={8} md={8}>
        <div className={classes.content}>
          <Grid container direction="row" spacing={2}>
            <Grid item sm={6} md={3}>
              <Typography variant="subtitle2" className={classes.textProperty}>AN</Typography>
              <Typography variant="h4" className={classes.textPropertyValue}>
                {booking?.an}
              </Typography>
            </Grid>
            <Grid item sm={6} md={3}>
              <Typography variant="subtitle2" className={classes.textProperty}>HN</Typography>
              <Typography variant="h4" className={classes.textPropertyValue}>
                {booking?.hn}
              </Typography>
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle2" className={classes.textProperty}>สิทธิ์การรักษา</Typography>
              <Typography variant="h4" className={classes.textPropertyValue}>
                {`${booking?.ip?.pttype?.pttype}-${booking?.ip?.pttype?.name}`}
              </Typography>
            </Grid>
            <Grid item sm={6} md={3}>
              <Typography variant="subtitle2" className={classes.textProperty}>วันที่ Admit</Typography>
              <Typography variant="h4" className={classes.textPropertyValue}>
                {moment(booking?.ip?.regdate).format('DD/MM/YYYY')}
              </Typography>
            </Grid>
            <Grid item sm={6} md={3}>
              <Typography variant="subtitle2" className={classes.textProperty}>เวลา</Typography>
              <Typography variant="h4" className={classes.textPropertyValue}>
                {booking?.ip?.regtime}
              </Typography>
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="subtitle2" className={classes.textProperty}>วอร์ด</Typography>
              <Typography variant="h4" className={classes.textPropertyValue}>
                {`${booking?.ip?.ward?.ward}-${booking?.ip?.ward?.name}`}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

BookingCard.propTypes = {
  booking: PropTypes.object
};

export default BookingCard;
