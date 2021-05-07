import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'react-bootstrap';
import { Grid, makeStyles } from '@material-ui/core';
import BedCard from './BedCard';

const useStyles = makeStyles(() => ({
  root: {},
  floorWrapper: {
    margin: '10px',
    padding: '10px'
  },
  floorName: {
    marginLeft: '10px',
    textDecoration: 'underline'
  }
}));

const FloorCard = ({ floor, rooms, usedRooms }) => {
  const classes = useStyles();

  return (
    <Card>
      <Row>
        <Col className={classes.floorWrapper}>
          <h3 className={classes.floorName}>{floor}</h3>
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
