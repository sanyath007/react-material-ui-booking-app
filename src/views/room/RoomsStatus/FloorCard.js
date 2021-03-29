import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { Grid } from '@material-ui/core';
import BedCard from './BedCard';

const FloorCard = ({
  floor,
  rooms,
  usedRooms,
  handleDischargeClick
}) => {
  return (
    <Row>
      {/* // TODO: styleing col */}
      <Col style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
        <h3>{floor}</h3>
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
                <BedCard
                  room={room}
                  used={used.length > 0 ? used[0] : null}
                  onDischargeClick={handleDischargeClick}
                />
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
  usedRooms: PropTypes.array,
  handleDischargeClick: PropTypes.func,
};

export default FloorCard;
