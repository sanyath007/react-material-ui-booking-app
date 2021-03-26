import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@material-ui/core';
import { Alert, Button } from 'react-bootstrap';

const BedCard = ({ room, usability }) => {
  // TODO: create onClick function

  return (
    <Card>
      {/* // TODO: styling CardContent */}
      <CardContent style={{ height: '220px' }}>
        <h5>{room.room_name}</h5>

        {usability ? (
          <Alert variant="danger" style={{ padding: '10px', marginBottom: '5px' }}>
            <div style={{ height: '100px' }}>
              <p style={{ margin: '0' }}>
                {`AN : ${usability.booking_room?.booking?.an?.an} HN: ${usability.booking_room?.booking?.an?.hn}`}
              </p>
              <p style={{ margin: '0' }}>
                {`ผู้ป่วย : ${usability.booking_room?.booking?.an?.patient?.pname}${usability.booking_room?.booking?.an?.patient?.fname} ${usability.booking_room?.booking?.an?.patient?.lname}`}
              </p>
              <p style={{ margin: '0' }}>
                {`วันที่ Admit : ${usability.booking_room?.booking?.an?.regdate}`}
              </p>
              <p style={{ margin: '0' }}>
                {`วันที่ย้ายเข้า : ${usability.booking_room?.checkin_date} ${usability.booking_room?.checkin_time}`}
              </p>
            </div>
          </Alert>
        ) : (
          <Alert variant="success" style={{ padding: '10px', marginBottom: '5px' }}>
            <div style={{ height: '100px' }}>
              ห้องว่าง
            </div>
          </Alert>
        )}
        {/* // TODO: set onClick function */}
        {usability && (
          <Button size="sm" variant="danger" style={{ margin: '0' }}>
            จำหน่าย
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

BedCard.propTypes = {
  room: PropTypes.object.isRequired,
  usability: PropTypes.object
};

export default BedCard;
