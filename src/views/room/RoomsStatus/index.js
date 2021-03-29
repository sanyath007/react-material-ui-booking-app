import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Page from 'src/components/Page';
import api from '../../../api';
import useStyles from './styles';
import FloorCard from './FloorCard';
import { bookingActions } from '../../../redux';

const RoomsStatus = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [rooms1, setRooms1] = useState([]);
  const [rooms2, setRooms2] = useState([]);
  const [rooms3, setRooms3] = useState([]);
  const [usedRooms, setUsedRooms] = useState([]);

  const fetchRoomsStatus = async () => {
    const res = await api.get('/rooms-status');

    const floor1 = res.data.rooms.filter((room) => parseInt(room.floor, 10) === 1);
    const floor2 = res.data.rooms.filter((room) => parseInt(room.floor, 10) === 2);
    const floor3 = res.data.rooms.filter((room) => parseInt(room.floor, 10) === 3);

    setRooms1(floor1);
    setRooms2(floor2);
    setRooms3(floor3);

    setUsedRooms(res.data.usedRooms);
  };

  useEffect(() => {
    fetchRoomsStatus();
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
          rooms={rooms1}
          usedRooms={usedRooms}
          handleDischargeClick={handleDischargeClick}
        />

        <FloorCard
          floor="ชั้น 2"
          rooms={rooms2}
          usedRooms={usedRooms}
          handleDischargeClick={handleDischargeClick}
        />

        <FloorCard
          floor="ชั้น 3"
          rooms={rooms3}
          usedRooms={usedRooms}
          handleDischargeClick={handleDischargeClick}
        />
      </Container>
    </Page>
  );
};

export default RoomsStatus;
