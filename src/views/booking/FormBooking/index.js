import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import {
  Grid,
  Typography,
  TextField,
  makeStyles
} from '@material-ui/core';
import FormControls from 'src/components/Forms';
import { Formik, Form, ErrorMessage } from 'formik';
import PatientModal from './PatientModal';
import api from '../../../api';

const useStyles = makeStyles((theme) => ({
  root: {},
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  buttonSubmit: {
    marginLeft: theme.spacing(1),
    marginBottom: 10,
  }
}));

const FormBooking = ({
  booking,
  bookingSchema,
  roomTypes,
  handleSubmit,
  handleRoomTypeChecked
}) => {
  const classes = useStyles();
  const [rtypes, setRtypes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isPatientReserve, setIsPatientReserve] = useState(false);

  useEffect(() => {
    const bookingRoomTypes = booking?.room_types?.split(',');
    const newRoomTypes = roomTypes.map((rt) => {
      const roomTypesId = bookingRoomTypes && bookingRoomTypes.find((brt) => {
        return brt === rt.room_type_id;
      });

      return {
        id: rt.room_type_id,
        name: rt.room_type_name,
        checked: roomTypesId !== undefined && true,
      };
    });

    setRtypes(newRoomTypes);
  }, [booking]);

  const handleAnOnFocus = (e) => {
    e.preventDefault();

    setOpenModal(true);
  };

  const handleOnHideModal = () => {
    setOpenModal(false);
  };

  const handlePatientReserve = async (e, formik) => {
    setIsPatientReserve(e.target.value);

    if (e.target.value) {
      if (formik.values.an !== '') {
        const res = await api.get(`/ips/${formik.values.an.split('-')[0]}`);

        formik.setFieldValue('book_name', `${res.data.patient?.pname}${res.data.patient?.fname} ${res.data.patient?.lname}`);
        formik.setFieldValue('book_tel', res.data.patient?.hometel);
      } else {
        alert('คุณยังไม่ได้เลือกผู้ป่วย กรุณาเลือกผู้ป่วยก่อน !!!');
        setIsPatientReserve(false);
      }
    } else {
      formik.setFieldValue('book_name', '');
      formik.setFieldValue('book_tel', '');

      return false;
    }
  };

  return (
    <Formik
      enableReinitialize={booking}
      initialValues={{
        an: booking?.an || '',
        book_date: moment(booking?.book_date) || new Date(),
        book_name: booking?.book_name || '',
        book_tel: booking?.book_tel || '',
        isOfficer: booking?.is_officer === '1' || false,
        description: booking?.description || '',
        remark: booking?.remark || '',
      }}
      validationSchema={bookingSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <Grid container direction="row" justify="center" alignItems="flex-start">
              <Grid container justify="center" spacing={1}>

                <Grid item sm={12} xs={12} style={{ textAlign: 'center' }}>
                  <Typography variant="h5">แก้ไขการจองห้องพิเศษ</Typography>
                </Grid>

                <PatientModal
                  isOpen={openModal}
                  hideModal={handleOnHideModal}
                  onSelected={(an) => formik.setFieldValue('an', an)}
                />

                <Grid item sm={6} xs={12}>
                  {booking
                    ? (
                      <TextField
                        variant="standard"
                        name="an"
                        label="AN ผู้ป่วย"
                        fullWidth
                        value={formik.values.an}
                        onChange={formik.handleChange}
                        error={formik.errors.an && formik.touched.an}
                        helperText={<ErrorMessage name="an" />}
                        inputProps={{
                          readOnly: true,
                        }}
                      />
                    ) : (
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
                    )}
                </Grid>
                <Grid item sm={6} xs={12}>
                  <FormControls.DatePickerInput
                    name="book_date"
                    label="วันที่จอง"
                    format="DD/MM/yyyy"
                    value={formik.values.book_date}
                    onChange={formik.handleChange}
                    error={formik.errors.book_date && formik.touched.book_date}
                    helperText={<ErrorMessage name="book_date" />}
                  />
                </Grid>
                <Grid item sm={12} xs={12} style={{ paddingLeft: '15px' }}>
                  <FormControls.CheckboxInput
                    name="isPatientReserve"
                    label="ผู้ป่วยจองเอง"
                    value={isPatientReserve}
                    handleChange={(e) => handlePatientReserve(e, formik)}
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
                    items={rtypes} // TODO: change all elements of items with id and name
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
                <Grid item sm={12} xs={12} style={{ paddingLeft: '15px' }}>
                  <FormControls.CheckboxInput
                    name="isOfficer"
                    label="เป็นเจ้าหน้าที่ของ รพ."
                    value={formik.values.isOfficer}
                    handleChange={formik.handleChange}
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  {booking
                    ? (
                      <Button
                        type="submit"
                        variant="warning"
                        block
                        className={classes.buttonSubmit}
                      >
                        แก้ไข
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="primary"
                        block
                        className={classes.buttonSubmit}
                      >
                        เพิ่ม
                      </Button>
                    )}
                </Grid>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

FormBooking.propTypes = {
  booking: PropTypes.object,
  bookingSchema: PropTypes.object,
  roomTypes: PropTypes.array,
  handleSubmit: PropTypes.func,
  handleRoomTypeChecked: PropTypes.func,
};

export default FormBooking;
