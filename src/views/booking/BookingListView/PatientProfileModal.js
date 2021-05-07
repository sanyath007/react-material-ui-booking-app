import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';
import {
  Box,
  Button as MuiButton,
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { ipActions, bookingActions } from '../../../redux';
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
    marginBottom: '10px'
  }
}));

const PatientProfileModal = ({
  isOpen,
  hideModal,
  an
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { ip } = useSelector((state) => state.ip);
  const { booking } = useSelector((state) => state.booking);

  useEffect(() => {
    if (an) {
      dispatch(ipActions.fetchIpByAn(an));
      dispatch(bookingActions.fetchBookingฺByAn(an));
    }
  }, [an]);

  return (
    <Modal
      show={isOpen}
      onHide={hideModal}
      size="xl"
      style={{ top: '50px', zIndex: '1500' }}
    >
      <Modal.Header closeButton>ข้อมูลผู้ป่วย</Modal.Header>
      <Modal.Body>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={4}
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
                      ip.patient?.sex === '1'
                        ? '/static/images/avatars/avatar_8.png'
                        : '/static/images/avatars/avatar_9.png'
                    }
                  />
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h4"
                  >
                    {`${ip.patient?.pname}${ip.patient?.fname} ${ip.patient?.lname}`}
                  </Typography>
                  <span>
                    {`โทร. ${ip.patient?.hometel}`}
                  </span>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            lg={8}
            md={8}
            xs={12}
          >
            <Card>
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Typography variant="h4">AN</Typography>
                    <Typography>{ip.an}</Typography>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Typography variant="h4">HN</Typography>
                    <Typography>{ip.hn}</Typography>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Typography variant="h4">ว/ด/ป เกิด</Typography>
                    <Typography>{moment(ip.patient?.birthday).format('DD/MM/YYYY')}</Typography>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Typography variant="h4">ที่อยู่</Typography>
                    <Typography>{`${ip.patient?.addrpart} ${ip.patient?.address?.full_name}`}</Typography>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Typography variant="h4">สิทธิการรักษา</Typography>
                    <Typography>{`${ip.pttype?.pttype}-${ip.pttype?.name}`}</Typography>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Typography variant="h4">วอร์ด</Typography>
                    <Typography>{`${ip.ward?.ward}-${ip.ward?.name}`}</Typography>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Typography variant="h4">วันที่ Admit</Typography>
                    <Typography>{moment(ip.regdate).format('DD/MM/YYYY')}</Typography>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Typography variant="h4">เวลา</Typography>
                    <Typography>{ip.regtime}</Typography>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Typography variant="h4">แพทย์ผู้ Admit</Typography>
                    <Typography>{`${ip.admdoctor?.code}-${ip.admdoctor?.name}`}</Typography>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Typography variant="h4">Pre Dx</Typography>
                    <Typography>{ip.prediag}</Typography>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Typography variant="h4">วันที่จองห้องพิเศษ</Typography>
                    <Typography>{moment(booking.book_date).format('DD/MM/YYYY')}</Typography>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Typography variant="h4">เวลา</Typography>
                    <Typography>{moment(booking.created_at).format('H:mm')}</Typography>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Typography variant="h4">ผู้จองห้องพิเศษ</Typography>
                    <Typography>{booking.book_name}</Typography>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
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
                <Button variant="success" onClick={() => dispatch(bookingActions.discharge(booking.book_id))}>
                  จำหน่าย
                  <MeetingRoomIcon />
                </Button>
                <Button variant="danger" onClick={() => dispatch(bookingActions.cancel(booking.book_id))}>
                  ยกเลิกจองห้อง
                  <EventBusyIcon />
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Modal.Body>
    </Modal>
  );
};

PatientProfileModal.propTypes = {
  isOpen: PropTypes.bool,
  hideModal: PropTypes.func,
  an: PropTypes.string.isRequired,
};

export default PatientProfileModal;
