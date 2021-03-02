import React from 'react';
import {
  Button,
  Container,
  Grid,
  Paper,
  // FormGroup,
  // FormLabel,
  // FormControl,
  // FormControlLabel,
  // FormHelperText,
  Typography,
  TextField,
} from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import FormControls from 'src/components/Forms';
import Page from 'src/components/Page';
import useStyles from './styles';

const initialValues = {
  checkin_date: moment(),
  checkin_time: moment().format('HH:MM'),
  room_id: '',
  haveObserver: false,
  observer_name: '',
  observer_tel: '',
};

const CheckinRoom = () => {
  const classes = useStyles();

  const checkinSchema = Yup.object().shape({
    checkin_date: Yup.string().required('Check in date is required'),
    checkin_time: Yup.string().required('Check in time is required'),
  });

  const onSubmit = (values, props) => {
    console.log(values, props);
  };

  return (
    <Page
      className={classes.root}
      title="Checkin Room"
    >
      <Container maxWidth={false}>
        <Paper className={classes.paper}>
          <Typography variant="h2">รับผู้ป่วยเข้าห้อง</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={checkinSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={12} md={6}>
                      <FormControls.DatePickerInput
                        variant="standard"
                        name="checkin_date"
                        label="วันที่รับเข้า"
                        fullWidth
                        value={formik.values.checkin_date}
                        onChange={formik.handleChange}
                        helperText={<ErrorMessage name="checkin_date" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <FormControls.TimePickerInput
                        name="checkin_time"
                        label="เวลารับเข้า"
                        value={formik.values.checkin_time}
                        onChange={formik.handleChange}
                        helperText={<ErrorMessage name="checkin_time" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        variant="standard"
                        name="room_id"
                        label="อาคาร"
                        fullWidth
                        value={formik.values.room_id}
                        onChange={formik.handleChange}
                        helperText={<ErrorMessage name="room_id" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        variant="standard"
                        name="room_id"
                        label="ห้อง"
                        fullWidth
                        value={formik.values.room_id}
                        onChange={formik.handleChange}
                        helperText={<ErrorMessage name="room_id" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <FormControls.CheckboxInput
                        name="haveObserver"
                        label="มีญาติเฝ้า"
                        value={formik.values.haveObserver}
                        handleChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        variant="standard"
                        name="room_id"
                        label="ชื่อ-สกุลญาติผู้เฝ้า"
                        fullWidth
                        value={formik.values.room_id}
                        onChange={formik.handleChange}
                        helperText={<ErrorMessage name="room_id" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        variant="standard"
                        name="room_id"
                        label="โทรศัพท์ญาติผู้เฝ้า"
                        fullWidth
                        value={formik.values.room_id}
                        onChange={formik.handleChange}
                        helperText={<ErrorMessage name="room_id" />}
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.buttonSubmit}
                        fullWidth
                      >
                        บันทึก
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Paper>
      </Container>
    </Page>
  );
};

export default CheckinRoom;
