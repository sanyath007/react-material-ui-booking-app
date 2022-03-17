import React, { useEffect } from 'react';
import { Container, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import withAuth from 'src/components/withAuth';
import Page from 'src/components/Page';
import useStyles from './styles';
import {
  roomActions,
  roomTypeActions,
  roomGroupActions,
  buildingActions
} from '../../../redux';
import FormRoom from '../FormRoom';

const NewRoom = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { roomTypes } = useSelector((state) => state.roomType);
  const { roomGroups } = useSelector((state) => state.roomGroup);
  const { buildings } = useSelector((state) => state.building);

  useEffect(() => {
    dispatch(roomTypeActions.fetchAll());
    dispatch(roomGroupActions.fetchAll());
    dispatch(buildingActions.fetchAll({ params: '' }));
  }, []);

  const handleSubmit = async (room) => {
    const formData = new FormData();

    formData.append('room_no', room.room_no);
    formData.append('room_name', room.room_name);
    formData.append('description', room.description);
    formData.append('room_type', room.room_type);
    formData.append('room_group', room.room_group);
    formData.append('building', room.building);
    formData.append('floor', room.floor);
    formData.append('price', room.price);
    formData.append('remark', room.remark);
    formData.append('room_img_url', room.room_img_url);
    formData.append('amenities', room.amenities);

    dispatch(roomActions.store(formData, navigate));
  };

  return (
    <Page className={classes.root} title="เพิ่มข้อมูลห้อง">
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

export default withAuth(NewRoom);
