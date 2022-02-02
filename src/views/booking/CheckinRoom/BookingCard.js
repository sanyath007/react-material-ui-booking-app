import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Divider,
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
            {/* Image uri path ${process.env.PUBLIC_URL}/static/images/avatars/avatar_9.png */}
            <Avatar
              className={classes.avatar}
              src={
                booking?.ip?.patient?.sex === '1'
                  ? ''
                  : ''
              }
            />
          </Grid>
          <Grid item>
            <Grid container direction="column" spacing={2} style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <Grid item>
                <Typography variant="h3">
                  {`${booking?.patient?.pname}${booking?.patient?.fname} ${booking?.patient?.lname}`}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{`อายุ ${calAge(booking?.patient?.birthday)} ปี`}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{`โทร. ${booking?.patient?.hometel}`}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{`CID ${booking?.patient?.cid}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.bookingContent} xs={12} sm={8} md={8}>
        <Grid container direction="row" spacing={1} style={{ padding: '0px 15px' }}>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="subtitle2" className={classes.textProperty}>AN</Typography>
            <Typography className={classes.textPropertyValue}>
              {booking?.an}
            </Typography>
            <Divider style={{ marginTop: '5px' }} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="subtitle2" className={classes.textProperty}>HN</Typography>
            <Typography className={classes.textPropertyValue}>
              {booking?.hn}
            </Typography>
            <Divider style={{ marginTop: '5px' }} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="subtitle2" className={classes.textProperty}>วันที่ Admit</Typography>
            <Typography className={classes.textPropertyValue}>
              {moment(booking?.patient?.admit?.regdate).format('DD/MM/YYYY')}
            </Typography>
            <Divider style={{ marginTop: '5px' }} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="subtitle2" className={classes.textProperty}>เวลา</Typography>
            <Typography className={classes.textPropertyValue}>
              {booking?.patient?.admit?.regtime}
            </Typography>
            <Divider style={{ marginTop: '5px' }} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="subtitle2" className={classes.textProperty}>วอร์ด</Typography>
            <Typography className={classes.textPropertyValue}>
              {`${booking?.patient?.admit?.ward?.ward}-${booking?.patient?.admit?.ward?.name}`}
            </Typography>
            <Divider style={{ marginTop: '5px' }} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="subtitle2" className={classes.textProperty}>สิทธิ์การรักษา</Typography>
            <Typography className={classes.textPropertyValue}>
              {`${booking?.patient?.admit?.pttype?.pttype}-${booking?.patient?.admit?.pttype?.name}`}
            </Typography>
            <Divider style={{ marginTop: '5px' }} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

BookingCard.propTypes = {
  booking: PropTypes.object
};

export default BookingCard;
