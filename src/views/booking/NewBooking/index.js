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
  FormHelperText,
  Typography,
  TextField,
} from '@material-ui/core';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'src/components/Page';
import { fetchRoomTypeAll } from '../../../redux';
import useStyles from './styles';

const initialBooking = {
  book_date: moment().format('DD/MM/YYYY'),
  an: '',
  description: '',
  remark: '',
  user_id: '',
  queue: 0,
  room_types: []
};

function NewBooking() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { roomTypes } = useSelector((state) => state.roomType);
  const [booking, setBooking] = useState(initialBooking);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(booking);
  };

  useEffect(() => {
    dispatch(fetchRoomTypeAll());
  }, []);

  return (
    <Page
      className={classes.root}
      title="Bookings"
    >
      <Container maxWidth={false}>
        <Paper className={classes.paper}>
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Grid container direction="row" justify="center" alignItems="flex-start" spacing={1}>
              <Grid container spacing={1} justify="center">
                <Grid item>
                  <Typography variant="h5">เพิ่มรายการจองห้อง</Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    variant="standard"
                    name="an"
                    label="AN"
                    fullWidth
                    value={booking.an}
                    onChange={(e) => setBooking({ ...booking, an: e.target.value })}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    variant="standard"
                    name="book_date"
                    label="วันที่จอง"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    value={booking.book_date}
                    onChange={(e) => setBooking({ ...booking, book_date: e.target.value })}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">ต้องการจองห้องประเภท (เลือกได้มากกว่า 1)</FormLabel>
                    <FormGroup>
                      {roomTypes.map((rt) => (
                        <FormControlLabel
                          control={<Checkbox name="room_types" />}
                          key={rt.room_type_id}
                          label={rt.room_type_name}
                        />
                      ))}
                    </FormGroup>
                    <FormHelperText>Be careful</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    variant="standard"
                    name="remark"
                    label="เพิ่มเติม"
                    multiline
                    rows={7}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
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
