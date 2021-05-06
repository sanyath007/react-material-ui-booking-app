import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { useDispatch } from 'react-redux';
import { checkin } from '../../../redux/booking/bookingSlice';
import useStyles from './styles';
import api from '../../../api';

const initialValues = {
  checkinDate: moment(),
  checkinTime: moment().format('HH:MM'),
  roomId: '',
  haveObserver: false,
  observerName: '',
  observerTel: '',
};

const CheckinRoom = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const buildings = useSelector((state) => state.building);
  const { bookId } = useParams();
  const [buildings, setBuildings] = useState([]);
  const [building, setBuilding] = useState('');
  const [rooms, setRooms] = useState([]);

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
    checkinDate: Yup.string().required('Check in date is required'),
    checkinTime: Yup.string().required('Check in time is required'),
    roomId: Yup.string().required('กรุณาเลือกห้องก่อน'),
    observerName: Yup.string().when('haveObserver', {
      is: (value) => value === true,
      then: Yup.string().required('กรุณาระบุชื่อ-สกุลญาติผู้เฝ้า')
    }),
    observerTel: Yup.string().when('haveObserver', {
      is: (value) => value === true,
      then: Yup.string().required('กรุณาระบุเบอร์โทรศัพท์ญาติผู้เฝ้า')
    }),
  });

  const handleBuildingChange = (e) => {
    setBuilding(e.target.value);

    fetchRoomByBuilding(e.target.value);
  };

  const onSubmit = (values, props) => {
    const {
      roomId,
      checkinDate,
      checkinTime,
      haveObserver,
      observerName,
      observerTel
    } = values;

    dispatch(checkin({
      bookId,
      roomId,
      checkinDate: moment(checkinDate).format('YYYY-MM-DD'),
      checkinTime: `${checkinTime}:00`,
      haveObserver: haveObserver ? 1 : 0,
      observerName,
      observerTel
    }));

    props.resetForm();
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
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={6}>
                      <FormControls.DatePickerInput
                        variant="standard"
                        name="checkinDate"
                        label="วันที่รับเข้า"
                        fullWidth
                        value={formik.values.checkinDate}
                        onChange={formik.handleChange}
                        helperText={<ErrorMessage name="checkinDate" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <FormControls.TimePickerInput
                        name="checkinTime"
                        label="เวลารับเข้า"
                        value={formik.values.checkinTime}
                        onChange={formik.handleChange}
                        helperText={<ErrorMessage name="checkinTime" />}
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
                        name="roomId"
                        label="ห้อง"
                        value={formik.values.roomId}
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
                        name="observerName"
                        label="ชื่อ-สกุลญาติผู้เฝ้า"
                        fullWidth
                        value={formik.values.observerName}
                        onChange={formik.handleChange}
                        error={formik.errors.observerName && formik.touched.observerName}
                        helperText={<ErrorMessage name="observerName" />}
                        disabled={!formik.values.haveObserver}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        variant="standard"
                        name="observerTel"
                        label="โทรศัพท์ญาติผู้เฝ้า"
                        fullWidth
                        value={formik.values.observerTel}
                        onChange={formik.handleChange}
                        error={formik.errors.observerTel && formik.touched.observerTel}
                        helperText={<ErrorMessage name="observerTel" />}
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
