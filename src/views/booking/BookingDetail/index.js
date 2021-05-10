import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import {
  Container,
  Card,
  CardContent,
  // Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { bookingActions } from '../../../redux';
import PatientProfile from './PatientProfile';
import Toolbar from './Toolbar';

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
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <PatientProfile patient={booking?.ip?.patient} />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <Typography variant="h4">AN</Typography>
                    <Typography>{booking?.ip?.an}</Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="h4">HN</Typography>
                    <Typography>{booking?.ip?.hn}</Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="h4">สิทธิการรักษา</Typography>
                    <Typography>{`${booking?.ip?.pttype?.pttype}-${booking?.ip?.pttype?.name}`}</Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="h4">วอร์ด</Typography>
                    <Typography>{`${booking?.ip?.ward?.ward}-${booking?.ip?.ward?.name}`}</Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="h4">วันที่ Admit</Typography>
                    <Typography>{moment(booking?.ip?.regdate).format('DD/MM/YYYY')}</Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="h4">เวลา</Typography>
                    <Typography>{booking?.ip?.regtime}</Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="h4">แพทย์ผู้ Admit</Typography>
                    <Typography>{`${booking?.ip?.admdoctor?.code}-${booking?.ip?.admdoctor?.name}`}</Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="h4">Pre Dx</Typography>
                    <Typography>{booking?.ip?.prediag}</Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="h4">วันที่จองห้องพิเศษ</Typography>
                    <Typography>{moment(booking.book_date).format('DD/MM/YYYY')}</Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="h4">เวลา</Typography>
                    <Typography>{moment(booking.created_at).format('H:mm')}</Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="h4">ผู้จองห้องพิเศษ</Typography>
                    <Typography>{booking.book_name}</Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="h4">เบอร์ติดต่อ</Typography>
                    <Typography>{booking.book_tel}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default BookingDetail;
