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
  const { bookings, pager } = useSelector((state) => state.booking);

  const [openModal, setOpenModal] = useState(false);
  const [selectedAn, setSelectedAn] = useState('');

  const handleOnHideModal = () => {
    console.log('On hide is called !!!');
    setOpenModal(false);
  };

  const handleViewDetailClick = (an) => {
    setOpenModal(true);

    setSelectedAn(an);
  };

  const handleCancelClick = (bookId) => {
    if (window.confirm(`คุณต้องการยกเลิกการจองห้องพิเศษรหัส ${bookId} ใช่หรือไม่ ?`)) {
      console.log(bookId);

      // TODO: to cancel booking data from db
    }
  };

  const handlePageChange = (url, page) => {
    dispatch(bookingActions.fetchAllWithPage(`${url}?page=${page}`));
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
        onCancelClick={handleCancelClick}
        an={selectedAn}
      />

      <Container maxWidth={false}>
        <Toolbar />

        <Box mt={3}>
          <Results
            bookings={bookings}
            pager={pager}
            onPageChange={handlePageChange}
            onViewDetailClick={handleViewDetailClick}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default BookingListView;
