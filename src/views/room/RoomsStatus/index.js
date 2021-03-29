import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'src/components/Page';
// import api from '../../../api';
import useStyles from './styles';
import FloorCard from './FloorCard';
import {
  bookingActions,
  roomActions
} from '../../../redux';

const RoomsStatus = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    floor1,
    floor2,
    floor3,
    usedRooms
  } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(roomActions.fetchRoomsStatus());
  }, []);

  const handleDischargeClick = (bookId, roomId) => {
    dispatch(bookingActions.checkout(bookId, roomId));
  };

  return (
    <Page
      className={classes.root}
      title="สถานะการใช้ห้อง"
    >
      <Container maxWidth={false}>
        <>
          <h2>อาคารผู้ป่วยใน 10 ชั้น</h2>
        </>
        <FloorCard
          floor="ชั้น 1"
          rooms={floor1}
          usedRooms={usedRooms}
          handleDischargeClick={handleDischargeClick}
        />

        <FloorCard
          floor="ชั้น 2"
          rooms={floor2}
          usedRooms={usedRooms}
          handleDischargeClick={handleDischargeClick}
        />

        <FloorCard
          floor="ชั้น 3"
          rooms={floor3}
          usedRooms={usedRooms}
          handleDischargeClick={handleDischargeClick}
        />
      </Container>
    </Page>
  );
};

export default RoomsStatus;
