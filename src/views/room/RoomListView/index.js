import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import RoomCard from '../RoomCard/RoomCard';
import useStyles from './styles';
import { roomActions } from '../../../redux';

const RoomList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.room);
  const [filteredRoom, setFilteredRoom] = useState([]);

  const showFilteredRoom = (floor) => {
    const tmpRooms = rooms.filter((room) => parseInt(room.floor, 10) === floor);

    setFilteredRoom(tmpRooms);
  };

  useEffect(() => {
    dispatch(roomActions.fetchRoomAll());
  }, []);

  return (
    <Page
      className={classes.root}
      title="Rooms"
    >
      <Container maxWidth={false}>
        <Toolbar showFilteredRoom={showFilteredRoom} />

        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {filteredRoom && filteredRoom.map((room) => (
              <Grid
                item
                key={room.room_id}
                lg={4}
                md={6}
                xs={12}
              >
                <RoomCard
                  className={classes.roomCard}
                  room={room}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Page>
  );
};

export default RoomList;
