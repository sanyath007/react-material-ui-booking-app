import React, { useEffect } from 'react';
import {
  Container,
  Paper,
} from '@material-ui/core';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import withAuth from 'src/components/withAuth';
import Page from 'src/components/Page';
import { bookingActions, roomTypeActions } from '../../../redux';
import useStyles from './styles';
import FormBooking from '../FormBooking';

function EditBooking() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const { roomTypes } = useSelector((state) => state.roomType);
  const { booking } = useSelector((state) => state.booking);
  const { auth } = useSelector((state) => state.auth);

  const handleSubmit = async (values, props) => {
    if (values) {
      const data = {
        id: values.id,
        an: values.an.split('-')[0],
        hn: values.hn,
        book_date: moment(values.book_date).format('YYYY-MM-DD'),
        book_name: values.book_name,
        book_tel: values.book_tel,
        is_officer: values.isOfficer ? '1' : '0',
        description: values.description,
        remark: values.remark,
        queue: 0,
        user: auth.username,
        ward: values.ward,
        specialist: values.specialist,
        room_types: values.roomTypeSelecteds.toString() // use value in array from useState hook
      };

      dispatch(bookingActions.updateAsync({ id: values.id, data, navigate }));

      props.resetForm();
    }
  };

  useEffect(() => {
    dispatch(bookingActions.fetchBookingฺById(bookId));

    dispatch(roomTypeActions.fetchAll());
  }, []);

  return (
    <Page
      className={classes.root}
      title="แก้ไขการจองห้องพิเศษ"
    >
      <Container maxWidth={false}>
        <Paper className={classes.paper}>

          <FormBooking
            booking={booking}
            roomTypes={roomTypes}
            handleSubmit={handleSubmit}
          />

        </Paper>
      </Container>
    </Page>
  );
}

export default withAuth(EditBooking);
