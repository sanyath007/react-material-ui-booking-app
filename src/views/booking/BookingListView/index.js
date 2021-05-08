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

  const handleViewDetailClick = (an) => {
    setOpenModal(true);

    setSelectedAn(an);
  };

  const handlePageChange = (url, page) => {
    dispatch(bookingActions.fetchAllWithPage(`${url}?page=${page}`));
  };

  const handleSearch = (keyword) => {
    console.log(keyword);
    const qs = keyword ? `?search=fname:${keyword}` : '';

    dispatch(bookingActions.fetchBookingAll(qs));
  };

  useEffect(() => {
    dispatch(bookingActions.fetchBookingAll());
  }, []);

  return (
    <Page className={classes.root} title="รายการจองห้องพิเศษ">

      <PatientProfileModal
        isOpen={openModal}
        hideModal={() => setOpenModal(false)}
        an={selectedAn}
      />

      <Container maxWidth={false}>
        <Toolbar handleSearch={handleSearch} />

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
