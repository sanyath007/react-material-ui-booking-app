import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
} from '@material-ui/core';
import * as Yup from 'yup';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Page from 'src/components/Page';
import { bookingActions, roomTypeActions } from '../../../redux';
import useStyles from './styles';
import FormBooking from './FormBooking';

function EditBooking() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const { roomTypes } = useSelector((state) => state.roomType);
  const { booking } = useSelector((state) => state.booking);
  const [roomTypeIds, setRoomTypeIds] = useState([]);

  const bookingSchema = Yup.object().shape({
    an: Yup.string().required('กรุณาระบุ An ของผู้ป่วยก่อน'),
    book_date: Yup.string().required('กรุณาระบุวันที่จองก่อน'),
    book_name: Yup.string().required('กรุณาระบุชื่อ-สกุลผู้จองก่อน'),
    book_tel: Yup.string().required('กรุณาระบุเบอร์ติดต่อผู้จองก่อน'),
    // description: Yup.string().required('Description is required'),
    // remark: Yup.string().required('Remark is required'),
  });

  const handleSubmit = async (values, props) => {
    if (values) {
      const data = {
        an: values.an.split('-')[0],
        book_date: moment(values.book_date).format('YYYY-MM-DD'),
        book_name: values.book_name,
        book_tel: values.book_tel,
        is_officer: values.isOfficer,
        description: values.description,
        remark: values.remark,
        queue: 0,
        user: '1300200009261', // TODO: set user to logged in user and user's ward
        ward: '01',
        room_types: roomTypeIds.toString() // use value in array from useState hook
      };

      console.log(data);
      // dispatch(bookingActions.addBooking(data));

      props.resetForm();
    }
  };

  const handleRoomTypeChecked = (id) => {
    const index = roomTypeIds.indexOf(id);
    let newSelectedRoomTypeIds = [];

    if (index === -1) {
      newSelectedRoomTypeIds = newSelectedRoomTypeIds.concat(roomTypeIds, id);
    } else {
      newSelectedRoomTypeIds = newSelectedRoomTypeIds.concat(
        roomTypeIds.splice(0, index),
        roomTypeIds.splice(index + 1)
      );
    }

    setRoomTypeIds(newSelectedRoomTypeIds);
  };

  useEffect(() => {
    dispatch(bookingActions.fetchBookingฺById(bookId));

    dispatch(roomTypeActions.fetchRoomTypeAll());
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
            bookingSchema={bookingSchema}
            roomTypes={roomTypes}
            handleSubmit={handleSubmit}
            handleRoomTypeChecked={handleRoomTypeChecked}
          />

        </Paper>
      </Container>
    </Page>
  );
}

export default EditBooking;
