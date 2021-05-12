import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from '../../../components/Page';
import Toolbar from './Toolbar';
import useStyles from './styles';
import api from '../../../api';
import QueueCard from './QueueCard';

const QueueListView = () => {
  const classes = useStyles();
  const [queues, setQueues] = useState([]);

  const fetchQueue = async () => {
    const res = await api.get('queues');

    setQueues(res.data.items);
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  return (
    <Page className={classes.root} title="รายการจองห้องพิเศษ">
      <Container maxWidth={false}>
        <Toolbar />

        <Box mt={3}>
          <Grid container spacing={2}>

            {queues && queues.map((q, i) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={q.book_id}>

                <QueueCard booking={q} queue={i + 1} />

              </Grid>
            ))}

          </Grid>
        </Box>
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

export default QueueListView;
