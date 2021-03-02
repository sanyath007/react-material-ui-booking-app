import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
} from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import FormControls from 'src/components/Forms';
import Page from 'src/components/Page';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBuildingAll } from '../../../redux';
import useStyles from './styles';
import api from '../../../api';

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
  const [buildings, setBuildings] = useState([]);
  const [building, setBuilding] = useState('');
  const [rooms, setRooms] = useState([]);
  // const dispatch = useDispatch();
  // const buildings = useSelector((state) => state.building);

  const fetchBuildingAll = async () => {
    const res = await api.get('/buildings');
    const arrBuildings = res.data.map((b) => ({ id: b.building_id, name: b.building_name }));

    setBuildings(arrBuildings);
  };

  const fetchRoomByBuilding = async (bid) => {
    const res = await api.get(`/rooms/building/${bid}`);
    const arrRooms = res.data.map((r) => ({ id: r.room_id, name: r.room_name }));

    setRooms(arrRooms);
  };

  useEffect(() => {
    fetchBuildingAll();
  }, []);

  const checkinSchema = Yup.object().shape({
    checkin_date: Yup.string().required('Check in date is required'),
    checkin_time: Yup.string().required('Check in time is required'),
    room_id: Yup.string().required('กรุณาเลือกห้องก่อน'),
  });

  const handleBuildingChange = (e) => {
    setBuilding(e.target.value);

    fetchRoomByBuilding(e.target.value);
  };

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
                      <FormControls.SelectInput
                        name="building"
                        label="อาคาร"
                        value={building}
                        handleChange={handleBuildingChange}
                        options={buildings}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <FormControls.SelectInput
                        name="room_id"
                        label="ห้อง"
                        value={formik.values.room_id}
                        handleChange={formik.handleChange}
                        options={rooms}
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
                        name="observer_name"
                        label="ชื่อ-สกุลญาติผู้เฝ้า"
                        fullWidth
                        value={formik.values.observer_name}
                        onChange={formik.handleChange}
                        helperText={<ErrorMessage name="observer_name" />}
                        disabled={!formik.values.haveObserver}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        variant="standard"
                        name="observer_tel"
                        label="โทรศัพท์ญาติผู้เฝ้า"
                        fullWidth
                        value={formik.values.observer_tel}
                        onChange={formik.handleChange}
                        helperText={<ErrorMessage name="observer_tel" />}
                        disabled={!formik.values.haveObserver}
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
