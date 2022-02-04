import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import withAuth from 'src/components/withAuth';
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
    dispatch(bookingActions.fetchAllWithPageAsync(`${url}?page=${page}`));
  };

  const handleSearch = (searchText) => {
    const qs = searchText ? `?search=${searchText}` : '';

    dispatch(bookingActions.fetchAllAsync({ qs }));
  };

  useEffect(() => {
    dispatch(bookingActions.fetchAllAsync({ qs: '' }));
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

export default withAuth(BookingListView);
