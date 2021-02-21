import React, { useEffect, useState } from 'react';
import { Container, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'src/components/Page';
import useStyles from './styles';
import {
  // addRoom,
  fetchRoomTypeAll,
  fetchRoomGroupAll,
  fetchBuildingAll
} from '../../../redux';
import FormRoom from '../FormRoom/FormRoom';

const NewRoom = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { roomTypes } = useSelector((state) => state.roomType);
  const { roomGroups } = useSelector((state) => state.roomGroup);
  const { buildings } = useSelector((state) => state.building);

  useEffect(() => {
    dispatch(fetchRoomTypeAll());
    dispatch(fetchRoomGroupAll());
    dispatch(fetchBuildingAll());
  }, []);

  const validate = (room) => {
    const error = {};
    console.log('Validate is called');

    error.room_no = room.room_no ? '' : 'Room no is required!!';
    error.room_name = room.room_name ? '' : 'Room name is required!!';

    setErrors({ ...error });

    return Object.values(error).every((el) => el === '');
  };

  const handleSubmit = async (e, room) => {
    e.preventDefault();
    console.log(room);

    if (!validate(room)) {
      window.alert('You have invalid data!!');
    } else {
      // const formData = new FormData();

      // formData.append('room_no', room.room_no);
      // formData.append('room_name', room.room_name);
      // formData.append('description', room.description);
      // formData.append('room_type', room.room_type);
      // formData.append('room_group', room.room_group);
      // formData.append('building_id', room.building_id);
      // formData.append('floor', room.floor);
      // formData.append('room_img_url', room.room_img_url);

      // dispatch(addRoom(formData));
    }
  };

  console.log(errors);

  return (
    <Page
      className={classes.root}
      title="Rooms"
    >
      <Container maxWidth={false}>
        <Paper className={classes.paper}>
          <FormRoom
            roomTypes={roomTypes}
            roomGroups={roomGroups}
            buildings={buildings}
            handleSubmit={handleSubmit}
          />
        </Paper>
      </Container>
    </Page>
  );
};

export default NewRoom;
