import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import useStyles from './styles';
import data from './data';
import { fetchBookingAll } from '../../../redux';

const BookingListView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [customers] = useState(data);
  const bookings = useSelector(state => state.bookings);

  useEffect(() => {
    dispatch(fetchBookingAll());
  }, []);

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results customers={customers} />
        </Box>
      </Container>
    </Page>
  );
};

export default BookingListView;
