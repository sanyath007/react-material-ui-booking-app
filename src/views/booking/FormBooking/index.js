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
import * as Yup from 'yup';
import PatientModal from './PatientModal';

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
  roomTypes,
  handleSubmit
}) => {
  const classes = useStyles();
  const [rtypes, setRtypes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isPatientReserve, setIsPatientReserve] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const bookingSchema = Yup.object().shape({
    hn: Yup.string().required('กรุณาระบุผู้ป่วยก่อน'),
    book_date: Yup.string().required('กรุณาระบุวันที่จองก่อน'),
    book_name: Yup.string().required('กรุณาระบุชื่อ-สกุลผู้จองก่อน'),
    book_tel: Yup.string().required('กรุณาระบุเบอร์ติดต่อผู้จองก่อน'),
    // description: Yup.string().required('Description is required'),
    // remark: Yup.string().required('Remark is required'),
    roomTypeSelecteds: Yup.array().test('', 'กรุณาเลือกประเภทห้องที่อย่างน้อย 1 ประเภท', (value) => {
      return value.length > 0;
    }),
  });

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
  }, [roomTypes, booking]);

  const handleAnOnFocus = (e) => {
    e.preventDefault();

    setOpenModal(true);
  };

  const handlePatientReserve = async (e, formik) => {
    setIsPatientReserve(e.target.value);

    if (e.target.value) {
      if (formik.values.hn !== '') {
        formik.setFieldValue('book_name', `${selectedPatient.pname}${selectedPatient.fname} ${selectedPatient.lname}`);
        formik.setFieldValue('book_tel', selectedPatient.hometel);
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
        id: booking?.book_id || '',
        an: booking ? `${booking?.ip?.an}` : '',
        hn: booking ? `${booking?.ip?.hn}` : '',
        patient: booking ? `${booking?.ip?.patient?.pname}${booking?.ip?.patient?.fname} ${booking?.ip?.patient?.lname}` : '',
        ward: booking ? `${booking?.ward}` : '',
        book_date: moment(booking?.book_date) || new Date(),
        book_name: booking?.book_name || '',
        book_tel: booking?.book_tel || '',
        isOfficer: booking?.is_officer === '1' || false,
        description: booking?.description || '',
        remark: booking?.remark || '',
        roomTypeSelecteds: booking ? booking?.room_types?.split(',') : []
      }}
      validationSchema={bookingSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <input type="hidden" name="hn" value={formik.values.hn} onChange={formik.handleChange} />
            <input type="hidden" name="an" value={formik.values.an} onChange={formik.handleChange} />
            <input type="hidden" name="ward" value={formik.values.ward} onChange={formik.handleChange} />

            <Grid container direction="row" justify="center" alignItems="flex-start">
              <Grid container justify="center" spacing={1}>

                <Grid item sm={12} xs={12}>
                  <Typography variant="h3">{booking ? 'แก้ไขการจองห้องพิเศษ' : 'เพิ่มการจองห้องพิเศษ'}</Typography>
                </Grid>

                <PatientModal
                  isOpen={openModal}
                  hideModal={() => setOpenModal(false)}
                  onSelected={(patient, an, ward) => {
                    setSelectedPatient(patient);

                    formik.setFieldValue('hn', patient.hn);
                    formik.setFieldValue('an', an);
                    formik.setFieldValue('patient', `${patient.pname}${patient.fname} ${patient.lname}`);
                    formik.setFieldValue('ward', ward);
                  }}
                />

                <Grid item sm={6} xs={12}>
                  <TextField
                    variant="standard"
                    name="patient"
                    label="ผู้ป่วย"
                    fullWidth
                    value={formik.values.patient}
                    onChange={formik.handleChange}
                    onClick={(e) => !booking && handleAnOnFocus(e)}
                    error={formik.errors.hn && formik.touched.hn}
                    helperText={<ErrorMessage name="hn" />}
                    inputProps={{
                      readOnly: true,
                    }}
                  />
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
                    readOnly={booking && true}
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
                    name="roomTypeSelecteds"
                    handleChange={(selectedIds) => formik.setFieldValue('roomTypeSelecteds', selectedIds)}
                    items={rtypes} // TODO: change all elements of items with id and name
                    itemsDirection="row"
                    error={'roomTypeSelecteds' in formik.errors}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    variant="standard"
                    name="description"
                    label="รายละเอียด"
                    multiline
                    rows={4}
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
                    rows={4}
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
                        บันทึก
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
  roomTypes: PropTypes.array,
  handleSubmit: PropTypes.func,
};

export default FormBooking;
