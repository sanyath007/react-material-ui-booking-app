import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText
} from '@material-ui/core';
import FormControls from 'src/components/Forms';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useStyles from './styles';
import AmenityCheckboxes from './AmenityCheckboxes';

function FormRoom({
  roomTypes,
  roomGroups,
  buildings,
  handleSubmit,
  room
}) {
  const classes = useStyles();

  const roomSchema = Yup.object().shape({
    room_no: Yup.string().required('Room No is required'),
    room_name: Yup.string().required('Room Name is required'),
    room_type: Yup.string().required('Room Type is required'),
    room_group: Yup.string().required('Room Group is required'),
    building: Yup.string().required('Building is required'),
    floor: Yup.number().typeError('Floor shold be number').required('Floor is required'),
  });

  const onSubmit = (values, props) => {
    if (values) {
      handleSubmit(values);

      props.resetForm();
    }
  };

  const createAmenityIdLists = (amenities) => {
    if (!amenities) return [];

    return amenities.map((am) => am.amenity_id);
  };

  return (
    <Formik
      enableReinitialize={room}
      initialValues={{
        room_id: room ? room?.room_id || '' : '',
        room_no: room ? room?.room_no || '' : '',
        room_name: room ? room?.room_name || '' : '',
        description: room ? room?.description || '' : '',
        room_type: room ? parseInt(room?.room_type, 10) || '' : '',
        room_group: room ? parseInt(room?.room_group, 10) || '' : '',
        building: room ? parseInt(room?.building, 10) || '' : '',
        floor: room ? room?.floor || '' : '',
        room_img_url: room ? room?.room_img_url : '',
        amenities: room ? createAmenityIdLists(room?.amenities) : [],
      }}
      validationSchema={roomSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <Typography variant="h3">
              {room ? 'แก้ไขข้อมูลห้อง' : 'เพิ่มรายการห้องใหม่'}
            </Typography>
            <Grid container spacing={5}>
              <Grid item sm={6}>
                <TextField
                  variant="standard"
                  name="room_no"
                  label="เลขที่ห้อง"
                  fullWidth
                  value={formik.values.room_no}
                  onChange={formik.handleChange}
                  error={formik.errors.room_no && formik.touched.room_no}
                  helperText={<ErrorMessage name="room_no" />}
                />
                <TextField
                  variant="standard"
                  name="room_name"
                  label="ชื่อห้อง"
                  fullWidth
                  value={formik.values.room_name}
                  onChange={formik.handleChange}
                  error={formik.errors.room_name && formik.touched.room_name}
                  helperText={<ErrorMessage name="room_name" />}
                />
                <TextField
                  variant="standard"
                  name="description"
                  label="คำอธิบาย"
                  fullWidth
                  multiline
                  rows={5}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item sm={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel htmlFor="room-type" className={classes.selectLabel}>ประเภท</InputLabel>
                  <Select
                    labelId="room-type"
                    className={classes.selectInput}
                    variant="standard"
                    name="room_type"
                    value={formik.values.room_type}
                    onChange={formik.handleChange}
                    error={formik.errors.room_type && formik.touched.room_type}
                  >
                    {roomTypes.map((rt) => (
                      <MenuItem key={rt.room_type_id} value={rt.room_type_id}>
                        {rt.room_type_name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>
                    <ErrorMessage name="room_type" />
                  </FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel htmlFor="room-group" className={classes.selectLabel}>กลุ่ม</InputLabel>
                  <Select
                    labelId="room-group"
                    className={classes.selectInput}
                    variant="standard"
                    name="room_group"
                    fullWidth
                    value={formik.values.room_group}
                    onChange={formik.handleChange}
                    error={formik.errors.room_group && formik.touched.room_group}
                  >
                    {roomGroups.map((rg) => (
                      <MenuItem key={rg.room_group_id} value={rg.room_group_id}>
                        {rg.room_group_name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>
                    <ErrorMessage name="room_group" />
                  </FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel htmlFor="building" className={classes.selectLabel}>อาคาร</InputLabel>
                  <Select
                    labelId="building"
                    className={classes.selectInput}
                    variant="standard"
                    name="building"
                    fullWidth
                    value={formik.values.building}
                    onChange={formik.handleChange}
                    error={formik.errors.building && formik.touched.building}
                  >
                    { buildings.map((bd) => (
                      <MenuItem key={bd.building_id} value={bd.building_id}>
                        {bd.building_name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>
                    <ErrorMessage name="building" />
                  </FormHelperText>
                </FormControl>
                <TextField
                  variant="standard"
                  name="floor"
                  label="ชั้น"
                  fullWidth
                  value={formik.values.floor}
                  onChange={formik.handleChange}
                  error={formik.errors.floor && formik.touched.floor}
                  helperText={<ErrorMessage name="floor" />}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <AmenityCheckboxes
                  name="amenities"
                  value={formik.values.amenities}
                  handleChange={formik.handleChange}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <FormControls.FileUploadInput
                  name="room_img_url"
                  label="รูป"
                  defaultImg={formik.values.room_img_url}
                  handleChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                {room ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.buttonSubmit}
                    fullWidth
                  >
                    แก้ไข
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.buttonSubmit}
                    fullWidth
                  >
                    บันทึก
                  </Button>
                )}
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}

FormRoom.propTypes = {
  roomTypes: PropTypes.array,
  roomGroups: PropTypes.array,
  buildings: PropTypes.array,
  handleSubmit: PropTypes.func,
  resetForm: PropTypes.func,
  room: PropTypes.object
};

export default FormRoom;
