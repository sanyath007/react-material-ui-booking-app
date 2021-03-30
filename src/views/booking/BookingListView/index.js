import React, { useEffect } from 'react';
import {
  Box,
  Container,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import useStyles from './styles';
import { bookingActions } from '../../../redux';

const BookingListView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(bookingActions.fetchBookingAll());
  }, []);

  return (
    <Page
      className={classes.root}
      title="รายการจองห้องพิเศษ"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results bookings={bookings} />
        </Box>
      </Container>
    </Page>
  );
};

export default BookingListView;
