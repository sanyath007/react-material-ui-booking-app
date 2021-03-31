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
  an: '',
  book_date: new Date(),
  book_name: '',
  book_tel: '',
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

      dispatch(bookingActions.addBooking(data));

      props.resetForm();
    }
  };

  const handleAnOnFocus = (e) => {
    e.preventDefault();

    setOpenModal(true);
  };

  const handleOnHideModal = () => {
    setOpenModal(false);
  };

  const handleOnSelectAn = (an, setFieldValue) => {
    setFieldValue('an', an);
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
                        onSelected={(an) => handleOnSelectAn(an, formik.setFieldValue)}
                      />

                      <Grid item sm={6} xs={12}>
                        <TextField
                          variant="standard"
                          name="an"
                          label="AN ผู้ป่วย"
                          fullWidth
                          value={formik.values.an}
                          onChange={formik.handleChange}
                          onClick={(e) => handleAnOnFocus(e)}
                          error={formik.errors.an && formik.touched.an}
                          helperText={<ErrorMessage name="an" />}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <DatePicker
                          autoOk
                          disableToolbar
                          variant="inline"
                          label="วันที่จอง"
                          format="DD/MM/yyyy"
                          fullWidth
                          value={formik.values.book_date}
                          onChange={formik.handleChange}
                          error={formik.errors.book_date && formik.touched.book_date}
                          helperText={<ErrorMessage name="book_date" />}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          variant="standard"
                          name="book_name"
                          label="ผู้จอง (ระบุชื่อ-สกุล)"
                          fullWidth
                          value={formik.values.book_name}
                          onChange={formik.handleChange}
                          error={formik.errors.book_name && formik.touched.book_name}
                          helperText={<ErrorMessage name="book_name" />}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          variant="standard"
                          name="book_tel"
                          label="เบอร์ติดต่อ"
                          fullWidth
                          value={formik.values.book_tel}
                          onChange={formik.handleChange}
                          error={formik.errors.book_tel && formik.touched.book_tel}
                          helperText={<ErrorMessage name="book_tel" />}
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
                          error={formik.errors.description && formik.touched.description}
                          helperText={<ErrorMessage name="description" />}
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
                          error={formik.errors.remark && formik.touched.remark}
                          helperText={<ErrorMessage name="remark" />}
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
