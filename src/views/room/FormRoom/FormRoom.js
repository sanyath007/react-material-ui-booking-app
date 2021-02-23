import React, { useState } from 'react';
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
  FormGroup,
  FormLabel,
  FormHelperText
} from '@material-ui/core';
import FormControls from 'src/components/Forms';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useStyles from './styles';

const initialRoom = {
  room_no: '',
  room_name: '',
  description: '',
  room_type: '',
  room_group: '',
  building: '',
  floor: '',
  room_img_url: '',
  amenities: []
};

const initialAmenities = {
  bathroom: false,
  waterheater: false,
  refrigerator: false,
  wardrobe: false,
  television: false,
  microwave: false,
  diningtable: false,
  air: false,
  bed: false,
};

function FormRoom({
  roomTypes,
  roomGroups,
  buildings,
  handleSubmit
}) {
  const classes = useStyles();
  const [amenities, setAmenities] = useState(initialAmenities);

  const roomSchema = Yup.object().shape({
    room_no: Yup.string().required('Room No is required'),
    room_name: Yup.string().required('Room Name is required'),
    room_type: Yup.string().required('Room Type is required'),
    room_group: Yup.string().required('Room Group is required'),
    building: Yup.string().required('Building is required'),
    floor: Yup.number().typeError('Floor shold be number').required('Floor is required'),
  });

  const onSubmit = (values) => {
    if (values) {
      handleSubmit(values);
    }
  };

  const onCheckboxChange = (e) => {
    setAmenities({ ...amenities, [e.target.name]: e.target.value });
  };

  return (
    <Formik
      initialValues={initialRoom}
      validationSchema={roomSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <Typography variant="h5">เพิ่มรายการห้องใหม่</Typography>
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
              <Grid item sm={12}>
                <div className={classes.checkboxGroup}>
                  <FormGroup row>
                    <FormLabel component="legend">สิ่งอำนวยความสะดวก (เลือกได้มากกว่า 1 รายการ)</FormLabel>
                    <FormControls.CheckboxInput
                      name="refrigerator"
                      label="ตู้เย็น"
                      value={amenities.refrigerator}
                      handleChange={onCheckboxChange}
                    />
                    <FormControls.CheckboxInput
                      name="wardrobe"
                      label="ตู้เสื้อผ้า"
                      value={amenities.wardrobe}
                      handleChange={onCheckboxChange}
                    />
                    <FormControls.CheckboxInput
                      name="television"
                      label="ทีวี"
                      value={amenities.television}
                      handleChange={onCheckboxChange}
                    />
                    <FormControls.CheckboxInput
                      name="microwave"
                      label="ไมโครเวฟ"
                      value={amenities.microwave}
                      handleChange={onCheckboxChange}
                    />
                    <FormControls.CheckboxInput
                      name="bed"
                      label="เตียงญาติ"
                      value={amenities.bed}
                      handleChange={onCheckboxChange}
                    />
                    <FormControls.CheckboxInput
                      name="bathroom"
                      label="ห้องน้ำ"
                      value={amenities.bathroom}
                      handleChange={onCheckboxChange}
                    />
                    <FormControls.CheckboxInput
                      name="waterheater"
                      label="เครื่องทำน้ำอุ่น"
                      value={amenities.waterheater}
                      handleChange={onCheckboxChange}
                    />
                    <FormControls.CheckboxInput
                      name="diningtable"
                      label="โต๊ะ-เก้าอี้"
                      value={amenities.diningtable}
                      handleChange={onCheckboxChange}
                    />
                    <FormControls.CheckboxInput
                      name="air"
                      label="แอร์"
                      value={amenities.air}
                      handleChange={onCheckboxChange}
                    />
                  </FormGroup>
                </div>
              </Grid>
              <Grid item sm={12}>
                <FormControls.FileUploadInput
                  name="room_img_url"
                  label="รูป"
                  value={formik.values.room_img_url}
                  handleChange={formik.handleChange}
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
  );
}

FormRoom.propTypes = {
  roomTypes: PropTypes.array,
  roomGroups: PropTypes.array,
  buildings: PropTypes.array,
  handleSubmit: PropTypes.func,
};

export default FormRoom;
