import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  // Typography
} from '@material-ui/core';
// import { Pagination } from '@material-ui/lab';
import Page from '../../../components/Page';
import Toolbar from './Toolbar';
import useStyles from './styles';
import api from '../../../api';
import QueueCard from './QueueCard';

const QueueListView = () => {
  const classes = useStyles();
  const [queues, setQueues] = useState([]);
  const [onQueue, setOnQueue] = useState(1);

  const fetchQueue = async () => {
    const res = await api.get('queues');

    setQueues(res.data.items);
  };

  const handleSkipOnQueue = (dir) => {
    let newOnQueue = onQueue;
    if (dir === 1) {
      newOnQueue = onQueue === queues.length ? 1 : onQueue + 1;
    } else {
      newOnQueue = onQueue === 1 ? queues.length : onQueue - 1;
    }

    setOnQueue(newOnQueue);
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  return (
    <Page className={classes.root} title="รายการจองห้องพิเศษ">
      <Container maxWidth={false}>
        <Toolbar />

        <Box mt={3}>
          {/* // TODO: display topic by type selected */}
          {/* <Typography variant="h2">บุคคลทั่วไป</Typography> */}

          <Grid container spacing={2}>

            {queues && queues.map((q, i) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={q.book_id}>

                <QueueCard
                  booking={q}
                  queue={i + 1}
                  onQueue={onQueue}
                  slotCount={queues.length}
                  handleSkipOnQueue={handleSkipOnQueue}
                />

              </Grid>
            ))}

          </Grid>
        </Box>
        {/* <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box> */}
      </Container>
    </Page>
  );
};

export default QueueListView;
