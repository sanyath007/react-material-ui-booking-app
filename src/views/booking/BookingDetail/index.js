import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  // Divider,
  // Typography,
  makeStyles
} from '@material-ui/core';
import withAuth from 'src/components/withAuth';
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
      dispatch(bookingActions.fetchById({ id: bookId }));
    }
  }, []);

  return (
    <Page className={classes.root} title="รายละเอียดการจองห้อง">
      <Container maxWidth={false}>
        <Toolbar booking={booking} />

        <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>

              <PatientProfile patient={booking?.patient} />

            </Grid>
            <Grid item lg={8} md={6} xs={12}>

              <IpInfo booking={booking} />

              <BookingHistoryList booking={booking} className="mt-3" />

            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default withAuth(BookingDetail);
