import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { Grid } from '@material-ui/core';
import BedCard from './BedCard';

const FloorCard = ({ floor, rooms, usabilities }) => {
  const tmpRooms = rooms.map((room) => {
    room.usability = usabilities.filter((us) => us.room_id === room.room_id);

    return room;
  });

  return (
    <Row>
      {/* // TODO: styleing col */}
      <Col style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
        <h3>{floor}</h3>
        <Grid container>
          {tmpRooms.map((tmp) => {
            const { usability, ...room } = tmp;
            const roomStatus = usability.length > 0 ? usability[0] : null;

            return (
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={tmp.room_id} style={{ padding: '10px' }}>
                <BedCard room={room} usability={roomStatus} />
              </Grid>
            );
          })}
        </Grid>
      </Col>
    </Row>
  );
};

FloorCard.propTypes = {
  floor: PropTypes.string,
  rooms: PropTypes.array,
  usabilities: PropTypes.array,
};

export default FloorCard;
