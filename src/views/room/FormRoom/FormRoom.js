import React, { useState } from 'react';
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
import FileBase from 'react-file-base64';
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
  handleSubmit
}) {
  const classes = useStyles();
  const [room, setRoom] = useState(initialRoom);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const error = {};
    console.log('Validate is called');

    error.room_no = room.room_no ? '' : 'Room no is required!!';
    error.room_name = room.room_name ? '' : 'Room name is required!!';

    setErrors({ ...error });

    return Object.values(error).every((el) => el === '');
  };

  const onSubmit = () => {
    if (!validate()) {
      window.alert('You have invalid data!!');
    } else {

    }
  };

  console.log(errors);

  return (
    <form
      autoComplete="off"
      noValidate
      className={`${classes.root} ${classes.form}`}
      onSubmit={(e) => handleSubmit(e, room)}
    >
      <Typography variant="h5">เพิ่มรายการห้องใหม่</Typography>
      <TextField
        variant="standard"
        name="room_no"
        label="เลขที่ห้อง"
        fullWidth
        value={room.room_no}
        onChange={(e) => setRoom({ ...room, room_no: e.target.value })}
        error={room.room_no === ''}
        helperText={room.room_no === '' ? 'Room no is required!' : ''}
      />
      <TextField
        variant="standard"
        name="room_name"
        label="ชื่อห้อง"
        fullWidth
        value={room.room_name}
        onChange={(e) => setRoom({ ...room, room_name: e.target.value })}
        error={room.room_name === ''}
        helperText={room.room_name === '' ? 'Room name is required!' : ''}
      />
      <TextField
        variant="standard"
        name="description"
        label="คำอธิบาย"
        fullWidth
        value={room.description}
        onChange={(e) => setRoom({ ...room, description: e.target.value })}
      />
      <FormControl className={classes.formControl} fullWidth>
        <InputLabel htmlFor="room-type" className={classes.selectLabel}>ประเภท</InputLabel>
        <Select
          labelId="room-type"
          className={classes.selectInput}
          variant="standard"
          name="room_type"
          value={room.room_type}
          onChange={(e) => setRoom({ ...room, room_type: e.target.value })}
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
          value={room.room_group}
          onChange={(e) => setRoom({ ...room, room_group: e.target.value })}
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
          value={room.building_id}
          onChange={(e) => setRoom({ ...room, building_id: e.target.value })}
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
        value={room.floor}
        onChange={(e) => setRoom({ ...room, floor: e.target.value })}
      />
      <div className={classes.fileInput}>
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => setRoom({ ...room, room_img_url: base64 })}
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.buttonSubmit}
        fullWidth
      >
        บันทึก
      </Button>
    </form>
  );
}

FormRoom.propTypes = {
  roomTypes: PropTypes.array,
  roomGroups: PropTypes.array,
  buildings: PropTypes.array,
  handleSubmit: PropTypes.func,
};

export default FormRoom;
