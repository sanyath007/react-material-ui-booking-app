import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'react-bootstrap';
import { Grid, makeStyles } from '@material-ui/core';
import BedCard from './BedCard';
import FloorTitle from './FloorTitle';

const useStyles = makeStyles(() => ({
  root: {},
  floorCard: {
    marginBottom: '10px'
  },
  floorWrapper: {
    margin: '10px',
    padding: '10px',
    paddingBottom: '0px'
  },
}));

const FloorCard = ({ floor, rooms, usedRooms }) => {
  const classes = useStyles();
  const emptyRoom = rooms ? rooms.filter((filtered) => filtered.room_status === '0').length : 0;

  return (
    <Card className={classes.floorCard}>
      <Row>
        <Col className={classes.floorWrapper}>
          <FloorTitle title={floor} empty={emptyRoom} total={rooms.length} />

          <Grid container>
            {rooms.map((room) => {
              const used = usedRooms.filter((us) => us.room_id === room.room_id);

              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  xl={3}
                  key={room.room_id}
                  style={{ padding: '10px' }}
                >
                  <BedCard room={room} used={used.length > 0 ? used[0] : null} />
                </Grid>
              );
            })}
          </Grid>
        </Col>
      </Row>
    </Card>
  );
};

FloorCard.propTypes = {
  floor: PropTypes.string,
  rooms: PropTypes.array,
  usedRooms: PropTypes.array,
};

export default FloorCard;
