import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  // Divider,
  // Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import PatientProfile from './PatientProfile';
import IpInfo from './IpInfo';
import { bookingActions } from '../../../redux';
import BookingHistoryList from './BookingHistoryList';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const BookingDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { booking } = useSelector((state) => state.booking);
  const { bookId } = useParams();

  useEffect(() => {
    if (bookId) {
      dispatch(bookingActions.fetchBookingฺById(bookId));
    }
  }, []);

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Toolbar booking={booking} />

        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>

            <PatientProfile patient={booking?.ip?.patient} />

          </Grid>
          <Grid item lg={8} md={6} xs={12}>

            <IpInfo booking={booking} />
            <BookingHistoryList bookings={[]} className="mt-3" />

          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default BookingDetail;
