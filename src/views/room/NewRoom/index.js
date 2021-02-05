import React, { useState } from 'react';
import {
  Button,
  Container,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import FileBase from 'react-file-base64';
import Page from 'src/components/Page';
import useStyles from './styles';

const initialState = {
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
  const [room, setRoom] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(room);
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
            <InputLabel id="room-type">Room Type</InputLabel>
            <Select
              labelId="room-type"
              className={classes.selectInput}
              variant="outlined"
              name="room_type"
              fullWidth
              value={room.room_type}
              onChange={(e) => setRoom({ ...room, room_type: e.target.value })}
            >
              <MenuItem value={1}>Type 1</MenuItem>
              <MenuItem value={2}>Type 2</MenuItem>
            </Select>
            <InputLabel id="room-group">Room Group</InputLabel>
            <Select
              labelId="room-group"
              className={classes.selectInput}
              variant="outlined"
              name="room_group"
              fullWidth
              value={room.room_group}
              onChange={(e) => setRoom({ ...room, room_group: e.target.value })}
            >
              <MenuItem value={1}>Group 1</MenuItem>
              <MenuItem value={2}>Group 2</MenuItem>
            </Select>
            <InputLabel id="room-group">อาคาร</InputLabel>
            <Select
              labelId="room-group"
              className={classes.selectInput}
              variant="outlined"
              name="building_id"
              fullWidth
              value={room.building_id}
              onChange={(e) => setRoom({ ...room, building_id: e.target.value })}
            >
              <MenuItem value={1}>อาคาร 1</MenuItem>
              <MenuItem value={2}>อาคาร 2</MenuItem>
            </Select>
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
            <Button variant="contained" color="primary" type="submit" className={classes.buttonSubmit}>บันทึก</Button>
          </form>
        </Paper>
      </Container>
    </Page>
  );
};

export default NewRoom;
