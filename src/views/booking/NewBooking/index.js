import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Checkbox,
  Grid,
  Paper,
  FormGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  // FormHelperText,
  Typography,
  TextField,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'src/components/Page';
import { bookingActions } from '../../../redux';
import useStyles from './styles';
import PatientModal from './PatientModal';

const initialBooking = {
  book_date: new Date(),
  an: '',
  description: '',
  remark: '',
  room_types: []
};

function NewBooking() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { roomTypes } = useSelector((state) => state.roomType);
  const [booking, setBooking] = useState(initialBooking);
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: to validate data before store to db

    const data = {
      book_date: moment(booking.book_date).format('YYYY-MM-DD'),
      an: booking.an.split('-')[0],
      description: booking.description,
      remark: booking.remark,
      queue: 0,
      user: '1300200009261',
      ward: '01',
      room_types: booking.room_types.toString()
    };

    // TODO: set user to logged in user and user's ward

    dispatch(bookingActions.addBooking(data));
  };

  const handleRoomTypeChecked = (e) => {
    const index = booking.room_types.indexOf(e.target.name);
    let newSelectedRoomTypeIds = [];

    if (index === -1) {
      newSelectedRoomTypeIds = newSelectedRoomTypeIds.concat(booking.room_types, e.target.name);
    } else {
      newSelectedRoomTypeIds = newSelectedRoomTypeIds.concat(
        booking.room_types.splice(0, index),
        booking.room_types.splice(index + 1)
      );
    }

    setBooking({ ...booking, room_types: newSelectedRoomTypeIds });
  };

  const handleAnOnFocus = (e) => {
    console.log('On focus is called !!!');
    e.preventDefault();

    setOpenModal(true);
  };

  const handleOnHideModal = () => {
    console.log('On hide is called !!!');
    setOpenModal(false);
  };

  const handleOnSelectAn = (an) => setBooking({ ...booking, an });

  useEffect(() => {
    dispatch(bookingActions.fetchRoomTypeAll());
  }, []);

  return (
    <Page
      className={classes.root}
      title="Bookings"
    >
      <Container maxWidth={false}>
        <Paper className={classes.paper}>
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Grid container direction="row" justify="center" alignItems="flex-start">
              <Grid container justify="center" spacing={1}>
                <Grid item sm={12} xs={12} style={{ textAlign: 'center' }}>
                  <Typography variant="h5">เพิ่มรายการจองห้อง</Typography>
                </Grid>

                <PatientModal
                  isOpen={openModal}
                  hideModal={handleOnHideModal}
                  onSelected={handleOnSelectAn}
                />

                <Grid item sm={6} xs={12}>
                  <TextField
                    variant="standard"
                    name="an"
                    label="AN"
                    fullWidth
                    value={booking.an}
                    onChange={(e) => setBooking({ ...booking, an: e.target.value })}
                    onClick={(e) => handleAnOnFocus(e)}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <DatePicker
                    autoOk
                    disableToolbar
                    variant="inline"
                    label="วันที่จอง"
                    format="DD/MM/yyyy"
                    value={booking.book_date}
                    onChange={(date) => setBooking({ ...booking, book_date: date })}
                    fullWidth
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">ต้องการจองห้องประเภท (เลือกได้มากกว่า 1)</FormLabel>
                    <FormGroup>
                      {roomTypes.map((rt) => (
                        <FormControlLabel
                          control={
                            (
                              <Checkbox
                                name={rt.room_type_id}
                                onChange={handleRoomTypeChecked}
                              />
                            )
                          }
                          key={rt.room_type_id}
                          label={rt.room_type_name}
                        />
                      ))}
                    </FormGroup>
                    {/* <FormHelperText>Be careful</FormHelperText> */}
                  </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    variant="standard"
                    name="description"
                    label="เพิ่มเติม"
                    multiline
                    rows={7}
                    fullWidth
                    value={booking.description}
                    onChange={(e) => setBooking({ ...booking, description: e.target.value })}
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <TextField
                    variant="standard"
                    name="remark"
                    label="หมายเหตุ"
                    multiline
                    rows={3}
                    fullWidth
                    value={booking.remark}
                    onChange={(e) => setBooking({ ...booking, remark: e.target.value })}
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.buttonSubmit}
                  >
                    บันทึก
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Page>
  );
}

export default NewBooking;
