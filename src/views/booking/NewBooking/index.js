import React, { useEffect } from 'react';
import {
  Container,
  Paper,
} from '@material-ui/core';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import withAuth from 'src/components/withAuth';
import Page from 'src/components/Page';
import { bookingActions, roomTypeActions } from '../../../redux';
import useStyles from './styles';
import FormBooking from '../FormBooking';

function NewBooking() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { roomTypes } = useSelector((state) => state.roomType);

  const handleSubmit = async (values, props) => {
    if (values) {
      const data = {
        an: values.an.split('-')[0],
        hn: values.hn,
        book_date: moment(values.book_date).format('YYYY-MM-DD'),
        book_name: values.book_name,
        book_tel: values.book_tel,
        is_officer: values.isOfficer,
        description: values.description,
        remark: values.remark,
        queue: 0,
        user: '1300200009261', // TODO: set user to logged in user and user's ward
        ward: values.ward,
        specialist: values.specialist,
        room_types: values.roomTypeSelecteds.toString() // use value in array from useState hook
      };

      dispatch(bookingActions.store(data, navigate));

      props.resetForm();
    }
  };

  useEffect(() => {
    dispatch(roomTypeActions.fetchRoomTypeAll());
  }, []);

  return (
    <Page
      className={classes.root}
      title="เพิ่มการจองห้องพิเศษ"
    >
      <Container maxWidth={false}>
        <Paper className={classes.paper}>

          <FormBooking
            roomTypes={roomTypes}
            handleSubmit={handleSubmit}
          />

        </Paper>
      </Container>
    </Page>
  );
}

export default withAuth(NewBooking);
