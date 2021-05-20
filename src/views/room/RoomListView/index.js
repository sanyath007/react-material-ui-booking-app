import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import withAuth from 'src/components/withAuth';
import Toolbar from './Toolbar';
import RoomCard from '../RoomCard';
import useStyles from './styles';
import { roomActions } from '../../../redux';

const RoomList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { filteredRooms } = useSelector((state) => state.room);

  const showFilteredRoom = (floor = '') => {
    dispatch(roomActions.filterRoomsByFloor(floor));
  };

  useEffect(() => {
    dispatch(roomActions.fetchRoomAll());
  }, []);

  return (
    <Page className={classes.root} title="ห้องพิเศษ">
      <Container maxWidth={false}>
        <Toolbar showFilteredRoom={showFilteredRoom} />

        <Box mt={3}>
          <Grid container spacing={3}>
            {filteredRooms && filteredRooms.map((room) => (
              <Grid
                item
                lg={3}
                md={4}
                sm={6}
                xs={12}
                key={room.room_id}
              >
                <RoomCard className={classes.roomCard} room={room} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* // TODO: add manipulation of pagination */}
        <Box mt={3} display="flex" justifyContent="center">
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

export default withAuth(RoomList);
