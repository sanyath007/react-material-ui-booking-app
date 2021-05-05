import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'src/components/Page';
import useStyles from './styles';
import {
  roomActions,
  roomTypeActions,
  roomGroupActions,
  buildingActions,
} from '../../../redux';
import FormRoom from '../FormRoom';

const EditRoomView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { roomTypes } = useSelector((state) => state.roomType);
  const { roomGroups } = useSelector((state) => state.roomGroup);
  const { buildings } = useSelector((state) => state.building);
  const { room } = useSelector((state) => state.room);

  const handleSubmit = async (data) => {
    const { room_id: id, ...rest } = data;

    dispatch(roomActions.update(id, rest, navigate));
  };

  useEffect(() => {
    console.log('on load EditRoomView');
    dispatch(roomTypeActions.fetchRoomTypeAll());
    dispatch(roomGroupActions.fetchRoomGroupAll());
    dispatch(buildingActions.fetchBuildingAll());
    dispatch(roomActions.fetchById(roomId));
  }, []);

  return (
    <Page className={classes.root} title="แก้ไขข้อมูลห้อง">
      <Container maxWidth={false}>
        <Paper className={classes.paper}>
          <FormRoom
            roomTypes={roomTypes}
            roomGroups={roomGroups}
            buildings={buildings}
            handleSubmit={handleSubmit}
            room={room}
          />
        </Paper>
      </Container>
    </Page>
  );
};

export default EditRoomView;
