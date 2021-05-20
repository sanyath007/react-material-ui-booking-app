import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'react-bootstrap';
import { Grid } from '@material-ui/core';
import QueueCard from '../QueueCard';
import useStyles from './styles';
import api from '../../../../api';

const DepartCard = ({ depart }) => {
  const classes = useStyles();
  const [queues, setQueues] = useState([]);
  const [onQueue, setOnQueue] = useState(1);

  const fetchQueue = async () => {
    const res = await api.get(`queues?depart=${depart.no}`);

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
    <Card className={classes.departCard}>
      <Row>
        <Col>
          <h3 className={classes.departName}>{depart.name}</h3>

          <Grid container spacing={2}>
            {queues && queues.map((q, i) => (
              <Grid item xs={12} sm={4} md={3} lg={3} xl={2} key={q.book_id}>
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
        </Col>
      </Row>
    </Card>
  );
};

DepartCard.propTypes = {
  depart: PropTypes.object,
};

export default DepartCard;
