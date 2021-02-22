import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@material-ui/core';
// import FileBase from 'react-file-base64';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useStyles from './styles';

const initialRoom = {
  room_no: '',
  room_name: '',
  description: '',
  room_type: '',
  room_group: '',
  building_id: '',
  floor: '',
  room_img_url: ''
};

function FormRoom({
  roomTypes,
  roomGroups,
  buildings,
  // handleSubmit
}) {
  const classes = useStyles();

  const roomSchema = Yup.object().shape({
    room_no: Yup.string().required('Room No is required'),
    room_name: Yup.string().required('Room Name is required'),
  });

  const onSubmit = (values) => {
    if (values) {
      console.log(values);
    }
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
              rows={7}
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel htmlFor="room-type" className={classes.selectLabel}>ประเภท</InputLabel>
              <Select
                labelId="room-type"
                className={classes.selectInput}
                variant="standard"
                name="room_type"
                value={formik.values.room_type}
                onChange={formik.handleChange}
              >
                {roomTypes.map((rt) => (
                  <MenuItem key={rt.room_type_id} value={rt.room_type_id}>
                    {rt.room_type_name}
                  </MenuItem>
                ))}
              </Select>
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
              >
                {roomGroups.map((rg) => (
                  <MenuItem key={rg.room_group_id} value={rg.room_group_id}>
                    {rg.room_group_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel htmlFor="building" className={classes.selectLabel}>อาคาร</InputLabel>
              <Select
                labelId="building"
                className={classes.selectInput}
                variant="standard"
                name="building_id"
                fullWidth
                value={formik.values.building_id}
                onChange={formik.handleChange}
              >
                { buildings.map((bd) => (
                  <MenuItem key={bd.building_id} value={bd.building_id}>
                    {bd.building_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              variant="standard"
              name="floor"
              label="ชั้น"
              fullWidth
              value={formik.values.floor}
              onChange={formik.handleChange}
            />
            {/* <div className={classes.fileInput}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setRoom({ ...room, room_img_url: base64 })}
              />
            </div> */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.buttonSubmit}
              fullWidth
            >
              บันทึก
            </Button>
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
  // handleSubmit: PropTypes.func,
};

export default FormRoom;
