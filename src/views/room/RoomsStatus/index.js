import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import Page from 'src/components/Page';
import BedCard from './BedCard';
import api from '../../../api';
import useStyles from './styles';

const RoomsStatus = () => {
  const classes = useStyles();
  const [rooms, setRooms] = useState([]);

  const fetchRoomsStatus = async () => {
    const res = await api.get('/rooms-status');
    console.log(res);

    setRooms(res.data);
  };

  useEffect(() => {
    fetchRoomsStatus();
  }, []);

  return (
    <Page
      className={classes.root}
      title="สถานะการใช้ห้อง"
    >
      <Container maxWidth={false}>
        <Grid container spacing={5}>
          {rooms.map((room) => (
            <Grid item md={4} key={room.room_id}>
              <BedCard product={room} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
};

export default RoomsStatus;
