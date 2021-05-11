import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import TotalBookings from './TotalBookings';
import TotalPatients from './TotalPatients';
import EmptyRoom from './EmptyRoom';
import TotalProfit from './TotalProfit';
import Sales from './Sales';
import TrafficByDevice from './TrafficByDevice';
// import LatestOrders from './LatestOrders';
// import LatestProducts from './LatestProducts';
import api from '../../../api';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [overall, setOverall] = useState({ bookings: {}, rooms: {} });

  const fetchOverall = async () => {
    const bookings = await api.get('/dashboard/bookings');

    const rooms = await api.get('/dashboard/rooms');

    setOverall({ bookings: bookings.data, rooms: rooms.data });
  };

  useEffect(() => {
    fetchOverall();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalBookings value={parseInt(overall.bookings.book_queue, 10) || 0} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalPatients value={parseInt(overall.bookings.book_stay, 10) || 0} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <EmptyRoom
              empty={parseInt(overall.rooms.room_empty, 10) || 0}
              total={parseInt(overall.rooms.all_room, 10) || 0}
            />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice />
          </Grid>
          {/* <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
