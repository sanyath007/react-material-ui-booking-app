import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button as MuiButton,
  Container,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Button } from 'react-bootstrap';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Page from 'src/components/Page';
import { bookingActions } from '../../../redux';

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

  const handleCancelClick = (_id) => {
    if (window.confirm(`คุณต้องการยกเลิกการจองห้องพิเศษรหัส ${_id} ใช่หรือไม่ ?`)) {
      console.log(_id);

      dispatch(bookingActions.cancel(_id));
    }
  };

  const handleDischargeClick = (_id, ipAn) => {
    if (window.confirm(`คุณต้องการจำหน่ายผู้ป่วย AN ${ipAn} ใช่หรือไม่ ?`)) {
      console.log(_id);

      dispatch(bookingActions.discharge(_id));
    }
  };

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Card>
              <CardContent>
                <Box
                  alignItems="center"
                  display="flex"
                  flexDirection="column"
                >
                  <Avatar
                    className={classes.avatar}
                    src={
                      booking?.ip?.patient?.sex === '1'
                        ? '/static/images/avatars/avatar_8.png'
                        : '/static/images/avatars/avatar_9.png'
                    }
                  />
                  <Typography color="textPrimary" gutterBottom variant="h4">
                    {`${booking?.ip?.patient?.pname}${booking?.ip?.patient?.fname} ${booking?.ip?.patient?.lname}`}
                  </Typography>
                  <span>
                    {`โทร. ${booking?.ip?.patient?.hometel}`}
                  </span>
                </Box>
              </CardContent>
            </Card>
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
                    <Typography variant="h4">ว/ด/ป เกิด</Typography>
                    <Typography>{moment(booking?.ip?.patient?.birthday).format('DD/MM/YYYY')}</Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="h4">ที่อยู่</Typography>
                    <Typography>{`${booking?.ip?.patient?.addrpart} ${booking?.ip?.patient?.address?.full_name}`}</Typography>
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
              <Divider />
              <Box
                display="flex"
                justifyContent="space-between"
                p={2}
                spacing={5}
              >
                <Link to={`/app/checkin/${booking.book_id}`}>
                  <MuiButton variant="contained" color="primary" endIcon={<ExitToAppIcon />}>
                    รับเข้าห้อง
                  </MuiButton>
                </Link>
                <Button variant="success" onClick={() => handleDischargeClick(booking.book_id, booking?.ip?.an)}>
                  จำหน่าย
                  <MeetingRoomIcon />
                </Button>
                <Button variant="danger" onClick={() => handleCancelClick(booking.book_id)}>
                  ยกเลิกจองห้อง
                  <EventBusyIcon />
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default BookingDetail;
