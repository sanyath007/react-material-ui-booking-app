import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import FormControls from 'src/components/Forms';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'src/components/Page';
import { bookingActions, roomTypeActions } from '../../../redux';
import useStyles from './styles';
import PatientModal from './PatientModal';

const initialBooking = {
  book_date: new Date(),
  an: '',
  isOfficer: false,
  description: '',
  remark: '',
  room_types: []
};

function NewBooking() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { roomTypes } = useSelector((state) => state.roomType);
  const [openModal, setOpenModal] = useState(false);
  const [roomTypeIds, setRoomTypeIds] = useState([]);

  const bookingSchema = Yup.object().shape({
    book_date: Yup.string().required('book date is required'),
    an: Yup.string().required('An is required'),
    is_officer: Yup.boolean(),
    // description: Yup.string().required('Description is required'),
    // remark: Yup.string().required('Remark is required'),
    // queue: Yup.number(),
  });

  const handleSubmit = async (values, props) => {
    if (values) {
      const data = {
        book_date: moment(values.book_date).format('YYYY-MM-DD'),
        an: values.an.split('-')[0],
        is_officer: values.isOfficer,
        description: values.description,
        remark: values.remark,
        queue: 0,
        user: '1300200009261', // TODO: set user to logged in user and user's ward
        ward: '01',
        room_types: roomTypeIds.toString() // use value in array from useState hook
      };

      dispatch(bookingActions.addBooking(data));

      props.resetForm();
    }
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

  const handleOnSelectAn = (an) => {
    console.log(an);
    // setBooking({ ...booking, an });
  };

  const handleRoomTypeChecked = (e) => {
    const index = roomTypeIds.indexOf(e.target.name);
    let newSelectedRoomTypeIds = [];

    if (index === -1) {
      newSelectedRoomTypeIds = newSelectedRoomTypeIds.concat(roomTypeIds, e.target.name);
    } else {
      newSelectedRoomTypeIds = newSelectedRoomTypeIds.concat(
        roomTypeIds.splice(0, index),
        roomTypeIds.splice(index + 1)
      );
    }

    setRoomTypeIds(newSelectedRoomTypeIds);
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

          <Formik
            initialValues={initialBooking}
            validationSchema={bookingSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <Grid container direction="row" justify="center" alignItems="flex-start">
                    <Grid container justify="center" spacing={1}>

                      <Grid item sm={12} xs={12} style={{ textAlign: 'center' }}>
                        <Typography variant="h5">เพิ่มการจองห้องพิเศษ</Typography>
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
                          value={formik.values.an}
                          onChange={formik.handleChange}
                          onClick={(e) => handleAnOnFocus(e)}
                          error={formik.errors.room_no && formik.touched.room_no}
                          helperText={<ErrorMessage name="room_no" />}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <DatePicker
                          autoOk
                          disableToolbar
                          variant="inline"
                          label="วันที่จอง"
                          format="DD/MM/yyyy"
                          value={formik.values.book_date}
                          onChange={formik.handleChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item sm={12} xs={12}>
                        <FormControls.CheckboxGroupInput
                          label="ต้องการจองห้องประเภท (เลือกได้มากกว่า 1)"
                          handleChange={handleRoomTypeChecked}
                          items={roomTypes} // TODO: change all elements of items with id and name
                          itemsDirection="row"
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          variant="standard"
                          name="description"
                          label="รายละเอียด"
                          multiline
                          rows={3}
                          fullWidth
                          value={formik.values.description}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          variant="standard"
                          name="remark"
                          label="หมายเหตุ"
                          multiline
                          rows={3}
                          fullWidth
                          value={formik.values.remark}
                          onChange={formik.handleChange}
                        />
                      </Grid>

                      {/* // TODO: add check box for if patient is hospital's officer */}
                      <Grid item sm={12} xs={12} style={{ paddingLeft: '15px' }}>
                        <FormControls.CheckboxInput
                          name="isOfficer"
                          label="เป็นเจ้าหน้าที่ของ รพ."
                          value={formik.values.isOfficer}
                          handleChange={formik.handleChange}
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
                </Form>
              );
            }}
          </Formik>

        </Paper>
      </Container>
    </Page>
  );
}

export default NewBooking;
