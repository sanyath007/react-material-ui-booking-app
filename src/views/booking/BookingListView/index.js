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
import { bookingActions } from '../../../redux';
import PatientProfileModal from './PatientProfileModal';

const BookingListView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.booking);

  const [openModal, setOpenModal] = useState(false);

  const handleOnHideModal = () => {
    console.log('On hide is called !!!');
    setOpenModal(false);
  };

  const handleViewDetailClick = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    dispatch(bookingActions.fetchBookingAll());
  }, []);

  return (
    <Page
      className={classes.root}
      title="รายการจองห้องพิเศษ"
    >

      <PatientProfileModal
        isOpen={openModal}
        hideModal={handleOnHideModal}
      />

      <Container maxWidth={false}>
        <Toolbar />

        <Box mt={3}>
          <Results bookings={bookings} onViewDetailClick={handleViewDetailClick} />
        </Box>
      </Container>
    </Page>
  );
};

export default BookingListView;
