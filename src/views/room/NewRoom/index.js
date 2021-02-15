import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import Page from 'src/components/Page';
import useStyles from './styles';
import {
  addRoom,
  fetchRoomTypeAll,
  fetchRoomGroupAll,
  fetchBuildingAll
} from '../../../redux';

const initialState = {
  room_no: '',
  room_name: '',
  description: '',
  room_type: '',
  room_group: '',
  building_id: '',
  floor: '',
  room_img_url: ''
};

const NewRoom = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [room, setRoom] = useState(initialState);
  const { roomTypes } = useSelector((state) => state.roomType);
  const { roomGroups } = useSelector((state) => state.roomGroup);
  const { buildings } = useSelector((state) => state.building);

  useEffect(() => {
    dispatch(fetchRoomTypeAll());
    dispatch(fetchRoomGroupAll());
    dispatch(fetchBuildingAll());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('room_no', room.room_no);
    formData.append('room_name', room.room_name);
    formData.append('description', room.description);
    formData.append('room_type', room.room_type);
    formData.append('room_group', room.room_group);
    formData.append('building_id', room.building_id);
    formData.append('floor', room.floor);
    formData.append('room_img_url', room.room_img_url);

    dispatch(addRoom(formData));
  };

  return (
    <Page
      className={classes.root}
      title="Products"
    >
      <Container maxWidth={false}>
        <Paper className={classes.paper}>
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h5">เพิ่มรายการห้องใหม่</Typography>
            <TextField
              variant="outlined"
              name="room_no"
              label="เลขที่ห้อง"
              fullWidth
              value={room.room_no}
              onChange={(e) => setRoom({ ...room, room_no: e.target.value })}
            />
            <TextField
              variant="outlined"
              name="room_name"
              label="ชื่อห้อง"
              fullWidth
              value={room.room_name}
              onChange={(e) => setRoom({ ...room, room_name: e.target.value })}
            />
            <TextField
              variant="outlined"
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
                variant="outlined"
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
                variant="outlined"
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
                variant="outlined"
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
              variant="outlined"
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
        </Paper>
      </Container>
    </Page>
  );
};

export default NewRoom;
