import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import withAuth from 'src/components/withAuth';
import Page from 'src/components/Page';
import useStyles from './styles';
import FloorCard from './FloorCard';
import { roomActions, buildingActions } from '../../../redux';

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
    dispatch(roomActions.fetchStatus());
    dispatch(roomActions.fetchRooms());
    dispatch(buildingActions.fetchBuildings({ params: '?haveVip=1' }));
  }, []);

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
        />

        <FloorCard
          floor="ชั้น 2"
          rooms={floor2}
          usedRooms={usedRooms}
        />

        <FloorCard
          floor="ชั้น 3"
          rooms={floor3}
          usedRooms={usedRooms}
        />
      </Container>
    </Page>
  );
};

export default withAuth(RoomsStatus);
