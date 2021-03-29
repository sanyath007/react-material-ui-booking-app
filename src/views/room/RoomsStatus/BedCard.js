import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@material-ui/core';
import { Alert, Button } from 'react-bootstrap';
import moment from 'moment';

const BedCard = ({ room, used, onDischargeClick }) => {
  return (
    <Card>
      {/* // TODO: styling CardContent */}
      <CardContent style={{ height: '200px', fontSize: '14px' }}>
        <h5>{room.room_name}</h5>

        {used ? (
          <Alert variant="danger" style={{ padding: '10px', marginBottom: '5px' }}>
            <div style={{ height: '80px' }}>
              <p style={{ margin: '0' }}>
                {`AN : ${used.booking_room?.booking?.an?.an} HN: ${used.booking_room?.booking?.an?.hn}`}
              </p>
              <p style={{ margin: '0' }}>
                {`ผู้ป่วย : ${used.booking_room?.booking?.an?.patient?.pname}${used.booking_room?.booking?.an?.patient?.fname} ${used.booking_room?.booking?.an?.patient?.lname}`}
              </p>
              <p style={{ margin: '0' }}>
                {`วันที่ Admit : ${moment(used.booking_room?.booking?.an?.regdate).format('DD/MM/YYYY')}`}
              </p>
              <p style={{ margin: '0' }}>
                {`วันที่ย้ายเข้า : ${moment(used.booking_room?.checkin_date).format('DD/MM/YYYY')} ${used.booking_room?.checkin_time}`}
              </p>
            </div>
          </Alert>
        ) : (
          <Alert variant="success" style={{ padding: '10px', marginBottom: '5px' }}>
            <div style={{ height: '80px' }}>
              ห้องว่าง
            </div>
          </Alert>
        )}

        {used && (
          <Button
            size="sm"
            variant="danger"
            style={{ margin: '0' }}
            onClick={() => {
              onDischargeClick(used.booking_room.book_id, used.booking_room.room_id);
            }}
          >
            จำหน่าย
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

BedCard.propTypes = {
  room: PropTypes.object.isRequired,
  used: PropTypes.object,
  onDischargeClick: PropTypes.func,
};

export default BedCard;
